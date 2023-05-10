export interface AccountsDeltaData {
    timeStamp:Date;
    boid_id:string;
    balance:number;
    selfStaked:number;
    power:number;
    receivedDelegatedStake:number;
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
    from:Date;
    to:Date;
    boid_id?:string;
  }
export interface MintTotalByDate {
    date:string;
    total:number;
  }
  
export interface PwrClaimData {
    timeStamp:Date,
    boid_id:string,
    power_before:number,
    power_after:number,
    power_decayed:number,
    mint_total:number
  }

export type GlobalDeltaResponse = {
    timeStamp:Date;
    total_accounts:string;
    total_power:string;
    total_liquid_balance:string;
    total_stake:string;
  }
  
export interface RequestParams {
    from:Date;
    to:Date;
  }

export type AccountResponse = {
    date:Date;
    boid_id:string;
    staked:number;
    power:number;
    balance:number;
  }

export type FahDataResponse = {
    time:Date;
    name:string;
    score:BigInt;
  }

export type FahDataResTimeStamp = {
    timeStamp:Date;
    boid_id:string;
    score:BigInt;
  } 

export type CombinedResponse = AccountResponse & { score:string }
