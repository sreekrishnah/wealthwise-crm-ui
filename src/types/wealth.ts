export type RiskLevel = "low" | "medium" | "high" | "critical";
export type ClientSegment = "HNI" | "UHNI" | "Retail" | "Corporate";
export type KYCStatus = "verified" | "pending" | "expired" | "rejected";
export type ReviewStatus = "scheduled" | "completed" | "missed";
export type ComplianceStatus = "pending" | "overdue" | "completed";
export type GoalStatus = "on_track" | "at_risk" | "achieved";
export type PipelineStage = "prospect" | "kyc_done" | "active" | "premium" | "at_risk";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  segment: ClientSegment;
  aum: number;
  riskScore: number;
  riskLevel: RiskLevel;
  kycStatus: KYCStatus;
  rmName: string;
  nextReview: string;
  pipelineStage: PipelineStage;
  joinedDate: string;
  avatar?: string;
}

export interface KPIData {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface PortfolioHolding {
  id: string;
  name: string;
  type: string;
  value: number;
  allocation: number;
  gainLoss: number;
  gainLossPercent: number;
}

export interface Review {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  status: ReviewStatus;
  rmName: string;
  notes?: string;
}

export interface ComplianceTask {
  id: string;
  clientId: string;
  clientName: string;
  type: "kyc_renewal" | "risk_profile" | "nomination";
  dueDate: string;
  status: ComplianceStatus;
}

export interface Goal {
  id: string;
  clientId: string;
  clientName: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  status: GoalStatus;
  deadline: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
