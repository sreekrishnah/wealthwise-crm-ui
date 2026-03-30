import type { Client, Review, ComplianceTask } from "@/types/wealth";

export const mockClients: Client[] = [
  { id: "1", name: "Rajesh Mehta", email: "rajesh@mehta.in", phone: "+91-98765-43210", segment: "UHNI", aum: 45200000, riskScore: 32, riskLevel: "low", kycStatus: "verified", rmName: "Priya Sharma", nextReview: "2026-03-28", pipelineStage: "premium", joinedDate: "2021-06-15" },
  { id: "2", name: "Ananya Iyer", email: "ananya@iyer.co", phone: "+91-87654-32109", segment: "HNI", aum: 18700000, riskScore: 58, riskLevel: "medium", kycStatus: "verified", rmName: "Vikram Patel", nextReview: "2026-03-25", pipelineStage: "active", joinedDate: "2022-01-10" },
  { id: "3", name: "Kabir Singh", email: "kabir@singh.com", phone: "+91-76543-21098", segment: "HNI", aum: 12300000, riskScore: 74, riskLevel: "high", kycStatus: "pending", rmName: "Priya Sharma", nextReview: "2026-03-22", pipelineStage: "at_risk", joinedDate: "2020-11-03" },
  { id: "4", name: "Deepa Reddy", email: "deepa@reddy.in", phone: "+91-65432-10987", segment: "UHNI", aum: 67800000, riskScore: 21, riskLevel: "low", kycStatus: "verified", rmName: "Arjun Nair", nextReview: "2026-04-05", pipelineStage: "premium", joinedDate: "2019-08-22" },
  { id: "5", name: "Suresh Kumar", email: "suresh@kumar.co", phone: "+91-54321-09876", segment: "Retail", aum: 3200000, riskScore: 45, riskLevel: "medium", kycStatus: "expired", rmName: "Vikram Patel", nextReview: "2026-03-30", pipelineStage: "active", joinedDate: "2023-03-14" },
  { id: "6", name: "Meera Joshi", email: "meera@joshi.in", phone: "+91-43210-98765", segment: "HNI", aum: 22100000, riskScore: 85, riskLevel: "critical", kycStatus: "verified", rmName: "Arjun Nair", nextReview: "2026-03-23", pipelineStage: "at_risk", joinedDate: "2021-02-28" },
  { id: "7", name: "Aditya Rao", email: "aditya@rao.com", phone: "+91-32109-87654", segment: "Retail", aum: 5600000, riskScore: 38, riskLevel: "low", kycStatus: "verified", rmName: "Priya Sharma", nextReview: "2026-04-10", pipelineStage: "active", joinedDate: "2022-09-05" },
  { id: "8", name: "Nisha Gupta", email: "nisha@gupta.in", phone: "+91-21098-76543", segment: "HNI", aum: 15400000, riskScore: 62, riskLevel: "medium", kycStatus: "pending", rmName: "Vikram Patel", nextReview: "2026-03-26", pipelineStage: "kyc_done", joinedDate: "2023-07-19" },
];

export const mockReviews: Review[] = [
  { id: "r1", clientId: "3", clientName: "Kabir Singh", date: "2026-03-22", status: "scheduled", rmName: "Priya Sharma", notes: "Discuss portfolio rebalancing" },
  { id: "r2", clientId: "6", clientName: "Meera Joshi", date: "2026-03-23", status: "scheduled", rmName: "Arjun Nair", notes: "Risk assessment review" },
  { id: "r3", clientId: "2", clientName: "Ananya Iyer", date: "2026-03-25", status: "scheduled", rmName: "Vikram Patel" },
  { id: "r4", clientId: "8", clientName: "Nisha Gupta", date: "2026-03-26", status: "scheduled", rmName: "Vikram Patel" },
  { id: "r5", clientId: "1", clientName: "Rajesh Mehta", date: "2026-03-18", status: "completed", rmName: "Priya Sharma" },
  { id: "r6", clientId: "5", clientName: "Suresh Kumar", date: "2026-03-15", status: "missed", rmName: "Vikram Patel" },
];

export const mockCompliance: ComplianceTask[] = [
  { id: "c1", clientId: "5", clientName: "Suresh Kumar", type: "kyc_renewal", dueDate: "2026-03-20", status: "overdue" },
  { id: "c2", clientId: "3", clientName: "Kabir Singh", type: "risk_profile", dueDate: "2026-03-25", status: "pending" },
  { id: "c3", clientId: "8", clientName: "Nisha Gupta", type: "kyc_renewal", dueDate: "2026-03-28", status: "pending" },
  { id: "c4", clientId: "6", clientName: "Meera Joshi", type: "nomination", dueDate: "2026-03-19", status: "overdue" },
  { id: "c5", clientId: "1", clientName: "Rajesh Mehta", type: "risk_profile", dueDate: "2026-03-15", status: "completed" },
];

export function formatCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatAUMFull(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export const totalAUM = mockClients.reduce((sum, c) => sum + c.aum, 0);
