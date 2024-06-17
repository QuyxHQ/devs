type CreateSpaceProps = {
    name: string;
    url?: string;
};

type SpaceMetrics = {
    percentageSuccessfulLast1Hr: number;
    percentageSuccessfulLast24Hrs: number;
    avgResponseTimeLast5Mins: any;
    totalRequestsLast1Hr: number;
    successfulRequestsLast1Hr: number;
    failedRequestsLast1Hr: number;
    totalRequestsLast24Hrs: number;
    successfulRequestsLast24Hrs: number;
    failedRequestsLast24Hrs: number;
    totalRequestsAllTime: number;
};

type DashboardMetrics = {
    total_logs: number;
    total_spaces: number;
    failedRequestsLast24Hr: number;
    successfulRequestsLast24Hr: number;
    logs: {
        week1: {
            day1: number;
            day2: number;
            day3: number;
            day4: number;
            day5: number;
            day6: number;
            day7: number;
            total_week: number;
        };
        week2: {
            day1: number;
            day2: number;
            day3: number;
            day4: number;
            day5: number;
            day6: number;
            day7: number;
            total_week: number;
        };
    };
};

type Dev = Base & {
    name: string;
    email: string;
    picture: string;
    provider: 'google' | 'github';
};

type Space = Base & {
    owner: string;
    name: string;
    did: string;
    url?: string | null;
    keys: { pk: string; sk: string };
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
    version: number;
    chainId: string;
    username: string;
    pfp: string;
    bio: string;
    description: string;
    isFlagged: boolean;
    isForSale: boolean;
};

type Log = Base & {
    space: Space;
    dev: string;
    status: 'failed' | 'successful';
    log: string | null;
    action: string;
    response_time: number;
};

type Base = {
    _id: string;
    createdAt: string;
    updatedAt: string;
};

type AppContextProps = {
    isMounting: boolean;
    isLoggedIn: boolean;
    shouldRefresh: boolean;
    refresh: () => void;
    userInfo?: Dev;
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
    inputType?: React.HTMLInputTypeAttribute | 'textarea' | 'select';
    className?: string;
    required?: boolean;
    rows?: number;
    readOnly?: boolean;
    displayLabel?: boolean;
    displayOthersInSelect?: boolean;
    options?: {
        label: string;
        value: string;
    }[];
};

type AnchorLinkProps = {
    to: string;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    handleClick?: () => void;
    title?: string;
    target?: string;
};

type LayoutDependantsProps = {
    setDisplaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

type ModalProps = {
    displayModal: boolean;
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.JSX.Element;
    size?: 'md' | 'lg';
};

type TagInputProps = {
    setter: React.Dispatch<React.SetStateAction<string>>;
    getter: string;
    label: string;
    placeholder?: string;
    className?: string;
    required?: boolean;
};

type RenderTableProps<T> = {
    limit: number;
    page: number;
    total: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: T[];
};
