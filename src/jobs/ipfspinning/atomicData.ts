import { RPCendpoints } from "./eosio"
import {
  SchemaObject,
  SchemaInfoArray,
  AtomicTemplateData,
  AtomicTemplateRow,
  TableRowsResponse,
  SchemaData,
  DeserializedTemplateData,
  TemplatesInfo
} from "./types"
import { deserialize, ObjectSchema } from "atomicassets"
import { ISchema } from "atomicassets/build/Schema"
import { collectionsEOS, collectionsWAX, collectionsTelos } from "./links"
import { JsonRpc } from "eosjs"

const eosRPC = RPCendpoints[0]
const WAXrpc = RPCendpoints[3]
const TelosRPC = RPCendpoints[1]
// Step 1
// get schemas from atomicassets contract by collection name and return schema name and format
const getSchemaInfo = async(
  collection:string,
  RPCendpoint:JsonRpc
):Promise<SchemaInfoArray> => {
  try {
    let lower_bound = null
    const getdata = await RPCendpoint.get_table_rows({
      json: true,
      code: "atomicassets",
      table: "schemas",
      scope: collection,
      lower_bound,
      limit: 100
    })
    const schemas = getdata.rows
    const formats = schemas.map((schema) => {
      return {
        schema_name: schema.schema_name,
        format: schema.format
      }
    })
    return formats
  } catch (error) {
    console.error(error)
    throw error
  }
}
// const test1 = await getSchemaInfo(collectionsEOS[0], eosRPC)
// console.log(test1);

// Step 2
// transforms schema format by using atomicassets ObjectSchema function
async function formatSchemas(collection:string, RPCendpoint:JsonRpc) {
  const schemaFormats = await getSchemaInfo(collection, RPCendpoint)
  const transformedSchemas = schemaFormats.map((schema) => {
    const formatOnly = schema.format as SchemaObject[]
    const transformedSchema = ObjectSchema(formatOnly)
    return {
      schema_name: schema.schema_name,
      format: transformedSchema
    }
  })
  return transformedSchemas
}
// const formatedschema = await formatSchemas(collectionEOS);
// console.log(formatedschema[0]);

// Step 3
// get templates from atomicassets contract by collection name and format schema
const getAtomicTableTemplates = async(
  scope:string,
  schemaData:SchemaData[],
  RPCendpoint:JsonRpc
):Promise<AtomicTemplateData[]> => {
  try {
    const templates:AtomicTemplateData[] = []
    let lower_bound:string | null = null
    let more = true
    while (more) {
      const response:TableRowsResponse<AtomicTemplateRow> =
        await RPCendpoint.get_table_rows({
          json: true,
          code: "atomicassets",
          table: "templates",
          scope,
          lower_bound,
          limit: 100
        })

      // get schema for each template
      const schemaMap = new Map<string, ISchema>()
      for (const row of response.rows) {
        const schemaName = row.schema_name
        if (!schemaMap.has(schemaName)) {
          const schemaDataItem = schemaData.find(
            (item) => item.schema_name === schemaName
          )
          const schema = schemaDataItem ? schemaDataItem.format : null
          schemaMap.set(schemaName, schema)
        }
      }

      // push templates
      templates.push(
        ...response.rows.map((row) => {
          const schema = schemaMap.get(row.schema_name)
          if (!schema) {
            throw new Error(
              `No schema found for template with schema_name '${row.schema_name}'`
            )
          }
          return {
            template_id: row.template_id,
            schema_name: row.schema_name,
            transferable: row.transferable,
            burnable: row.burnable,
            max_supply: row.max_supply,
            issued_supply: row.issued_supply,
            immutable_serialized_data: deserialize(
              row.immutable_serialized_data,
              schema
            )
          }
        })
      )

      more = response.more
      lower_bound = response.rows[response.rows.length - 1].template_id
    }
    return templates
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Step 4
// extract template info from template data for a push to the db
function extractTemplateInfo(
  template:DeserializedTemplateData
):TemplatesInfo[] {
  const { template_id, schema_name, immutable_serialized_data } = template
  const result:TemplatesInfo[] = []

  if ("name" in immutable_serialized_data) {
    const { name, img, img2, img_back, video } = immutable_serialized_data
    if (img) {
      result.push({
        name: `Template-${template_id}_${name}_${schema_name}`,
        CID: img,
        datatype: "img"
      })
    }

    if (img2) {
      result.push({
        name: `Template-${template_id}_${name}_${schema_name}__img2`,
        CID: img2,
        datatype: "img"
      })
    }

    if (img_back) {
      result.push({
        name: `Template-${template_id}_${name}_${schema_name}__back`,
        CID: img_back,
        datatype: "img"
      })
    }

    if (video) {
      result.push({
        name: `Template-${template_id}_${name}_${schema_name}`,
        CID: video,
        datatype: "video"
      })
    }
  }

  return result
}
// console.log(extractTemplateInfo(collectionsTemplates[0][0]));

// Step 5
// extract template info from all templates for all collections and return data for a push to db
async function extractTemplatesInfoForCollections(
  collections:string[],
  RPCendpoint:JsonRpc
):Promise<TemplatesInfo[]> {
  const result:TemplatesInfo[] = []

  for (const collection of collections) {
    try {
      const schemaData = await formatSchemas(collection, RPCendpoint)
      const templates = await getAtomicTableTemplates(
        collection,
        schemaData,
        RPCendpoint
      )

      for (const template of templates) {
        const templateInfo = extractTemplateInfo(template)
        result.push(...templateInfo)
      }
    } catch (error) {
      console.error(`Error for ${collection}:`, error)
    }
  }

  return result
}
export const allEOSCollectionsTemplates =
  await extractTemplatesInfoForCollections(collectionsEOS, eosRPC)
export const allWAXCollectionsTemplates =
  await extractTemplatesInfoForCollections(collectionsWAX, WAXrpc)
// console.log(allCollectionsTemplates[0]);
export const allTelosCollectionsTemplates =
  await extractTemplatesInfoForCollections(collectionsTelos, TelosRPC)
