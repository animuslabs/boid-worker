export interface AccountsDeltaData {
    timeStamp:Date;
    boid_id:string;
    power:number;
  }
  
export interface AveragePowerData {
      date:string;
      boid_id:string;
      avgPower:number;
  }
  
export type TotalAveragePowerData = {
      date:string;
      avgPower:number;
    };
    
    
export type DeltasByDateAndBoidId = { [date:string]:{ [boid_id:string]:{ totPower:number; count:number } } }

export interface RequestQueryParams {
    from?:string;
    to?:string;
    boid_id?:string;
  }
export interface MintTotalByDate {
    date:string;
    total:number;
  }
  
export interface MintData {
    boid_id:string | undefined
    perDay:MintTotalByDate[]
    total:number
  }

export type GlobalDeltaResponse = {
    timeStamp:Date;
    total_accounts:string;
    total_power:string;
    total_liquid_balance:string;
    total_stake:string;
  }
  
export interface RequestParams {
    from?:string;
    to?:string;
  }

export type AccountResponse = {
    date:Date;
    boid_id:string;
    staked:number;
    power:number;
    balance:number;
  }
