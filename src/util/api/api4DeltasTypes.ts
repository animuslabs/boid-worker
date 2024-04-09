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
export interface ReqQueryReports {
    from:Date;
    to:Date;
    boid_id?:string;
    protocol_id?:number;
    round?:number;
  }

export interface ReqQueryReport {
    from:Date;
    to:Date;
    oracle?:string;
    boid_id?:string;
    protocol_id?:number;
    round?:number;
  }
export interface MintTotalByDate {
    date:string;
    total:number;
  }

export interface ReqQueryOracle {
    from:Date;
    to:Date;
    oracle?:string;
    round?:number;  
}

export interface PwrClaimData {
    timeStamp:Date;
    boid_id:string;
    power_before:number;
    power_after:number;
    power_from_boosters:number;
    mint_total:number;
    mint_account_earned:number;
    mint_overstake_mint:number;
    mint_power_mint:number;
    mint_powered_stake_mint:number;
    mint_team_cut:number;
    mint_team_owner_earned:number;
  }

export type GlobalDeltaResponse = {
    timeStamp:Date;
    total_power:string;
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

export type SentReportsResponse = {
    timeStamp:Date;
    boid_id:string;
    added_power:number;
    approval_weight:number;
    protocol_id:number;
    round:number;
  }

export type OraclePayResponse = {
    timeStamp:Date;
    basePay:number;
    bonusPay:number;
    oracle:string;
    reports_proposed:number;
    reports_unreported_unmerged:number;
    round:number;
    reports_reported_or_merged:number;
  }

export type PowerReportResponse = {
    timeStamp:Date;
    boid_id:string;
    oracle:string;
    protocol_id:number;
    round:number;
    units:number;
  }
