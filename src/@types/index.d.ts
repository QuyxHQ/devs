type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = {
  email: string;
  firstName: string;
  lastName: string;
  company: string | null;
  role: string;
  heardUsFrom: string;
  password: string;
};

type ChnagePasswordProps = {
  oldPassword: string;
  newPassword: string;
};

type RegisterAppProps = {
  name: string;
  description: string;
  blacklistedAddresses: string[] | null;
  whitelistedAddresses: string[] | null;
  allowedDomains: string[] | null;
  allowedBundleIDs: string[] | null;
};

type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

type ApiPaginationResponse<T> = {
  status: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    skip: number;
    total: number;
  };
};

type AppMetrics = {
  success_hour1: number;
  success_hour24: number;
  failed_hour1: number;
  failed_hour24: number;
  requests_hour24: number;
  total_requests: number;
  avg_response_time_min5: number;
  successRate_hour1: number;
  successRate_hour24: number;
};

type QuyxDev = Base & {
  email: string;
  firstName: string;
  lastName: string;
  company: string | null;
  role: string;
  heardUsFrom: string;
  verifiedPasswordLastOn: Date | null;
  isEmailVerified: boolean;
};

type QuyxApp = Base & {
  apiKey: string;
  clientID: string;
  owner: string;
  name: string;
  description: string;
  allowedDomains: string[] | null;
  allowedBundleIDs: string[] | null;
  blacklistedAddresses: string[] | null;
  whitelistedAddresses: string[] | null;
  isActive: boolean;
};

type QuyxSDKUser = Base & {
  app: string;
  address: string;
  card: QuyxCard;
  isActive: boolean;
};

type QuyxCard = Base & {
  owner: string;
  identifier: null | number;
  version: null | number;
  chainId: string;
  mintedBy: string;
  tempToken: string;
  username: string;
  pfp: string;
  bio: string;
  description: stirng | null;
  isForSale: boolean;
  isAuction: boolean | null;
  listingPrice: number | null;
  maxNumberOfBids: number | null;
  auctionEnds: Date | null;
  tags: string[] | null;
  isFlagged: boolean;
  isDeleted: boolean;
};

type QuyxLog = Base & {
  app: string;
  dev: string;
  status: "failed" | "successful";
  log: string | null;
  route: string;
  responseTime: number;
};

type Base = {
  createdAt: Date;
  updatedAt: Date;
};

type SandboxLoginProps = {
  message: {
    domain: string;
    address: string;
    statement: string;
    uri: string;
    version: string;
    chainId: number;
    nonce: string;
  };
  address: string;
  signature: string;
};

type AppContextProps = {
  isMounting: boolean;
  isLoggedIn: boolean;
  userInfo?: QuyxDev;
};

type IconProps = {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
};

type FormGroupProps = {
  getter: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  placeholder?: string;
  isPasswordField?: boolean;
  inputType?: React.HTMLInputTypeAttribute;
  className?: string;
  required?: boolean;
};

type AnchorLinkProps = {
  to: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  handleClick?: () => void;
  title?: string;
};
