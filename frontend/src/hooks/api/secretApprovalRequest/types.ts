import { UserWsKeyPair } from "../keys/types";
import { TSecretApprovalPolicy } from "../secretApproval/types";
import { EncryptedSecret } from "../secrets/types";
import { WsTag } from "../tags/types";

export enum ApprovalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected"
}

export enum CommitType {
  DELETE = "delete",
  UPDATE = "update",
  CREATE = "create"
}

export type TSecretApprovalSecChangeData = {
  _id: string;
  version: number;
  secretKeyCiphertext: string;
  secretKeyIV: string;
  secretKeyTag: string;
  secretValueCiphertext: string;
  secretValueIV: string;
  secretValueTag: string;
  secretCommentIV: string;
  secretCommentTag: string;
  secretCommentCiphertext: string;
  skipMultilineEncoding?: boolean;
  algorithm: "aes-256-gcm";
  keyEncoding: "utf8" | "base64";
  tags?: WsTag[];
};

export type TSecretApprovalSecChange = {
  _id: string;
  version: number;
  secretKey: string;
  secretValue: string;
  secretComment: string;
  tags?: string[];
};

export type TSecretApprovalRequest<
  T extends unknown = TSecretApprovalSecChangeData,
  J extends unknown = EncryptedSecret
> = {
  _id: string;
  committer: string;
  reviewers: {
    member: string;
    status: ApprovalStatus;
  }[];
  workspace: string;
  environment: string;
  folderId: string;
  hasMerged: boolean;
  status: "open" | "close";
  policy: TSecretApprovalPolicy;
  commits: {
    // if there is no secret means it was creation
    secret?: J;
    // if there is no new version its for Delete
    newVersion?: T;
    op: CommitType;
  }[];
};

export type TGetSecretApprovalRequestList = {
  workspaceId: string;
  environment?: string;
};

export type TGetSecretApprovalRequestDetails = {
  id: string;
  decryptKey: UserWsKeyPair;
};

export type TUpdateSecretApprovalRequestStatusDTO = {
  status: ApprovalStatus;
  id: string;
};
