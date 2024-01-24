import { CID } from "multiformats/cid"

// atomic assets
interface SchemaInfo {
  schema_name:string;
  format:any;
}
export type SchemaInfoArray = SchemaInfo[];
export type SchemaObject = { name:string, type:string, parent?:number };
export type AtomicTemplateRow = {
  template_id:string;
  schema_name:string;
  transferable:boolean;
  burnable:boolean;
  max_supply:number;
  issued_supply:number;
  immutable_serialized_data:Uint8Array;
}
export type AtomicTemplateData = Pick<AtomicTemplateRow, "template_id" | "schema_name" | "transferable" | "burnable" | "max_supply" | "issued_supply" | "immutable_serialized_data">;

export interface TableRowsResponse<T> {
  rows:T[];
  more:boolean;
}

export interface SchemaData {
  schema_name:string;
  format:any;
}



export interface TemplatesInfo {
  name:string;
  CID:string;
  datatype:string;
}

interface MyTemplateData {
  template_id:string,
  schema_name:string,
  transferable:boolean,
  burnable:boolean,
  max_supply:number,
  issued_supply:number,
}

export interface DeserializedTemplateData extends MyTemplateData {
  immutable_serialized_data:{ name:string; [key:string]:any; } | Uint8Array
}


export type DoubleStringArray = string[][];

export type TeamDataRes = {
  team_id:number;
  balance:number;
  stake:{
    unstaking:any[];
    self_staked:number;
    received_delegated_stake:number;
  };
  owner:string;
  managers:string[];
  min_pwr_tax_mult:number;
  owner_cut_mult:number;
  url_safe_name:string;
  power:number;
  members:number;
  last_edit_round:number;
  team_meta_ipfs:string;
}

export type TableByScope = {
        code:string,
        scope:string,
        table:string,
        payer:string,
        count:number
};

export interface PinnedType {
  index:number;
  name:String;
  CID:String;
  retention?:String[];
  active:Boolean;
  datatype:String;
  size:BigInt;
}

export type MyResultType = {
  cid:any;
  pinType:"recursive" | "direct";
};
