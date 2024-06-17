import toast from 'react-hot-toast';

const TOAST_STATUS = ['success', 'error', 'info', 'warning', 'default', 'notification'] as const;

type Props = {
    type: (typeof TOAST_STATUS)[number];
    message: string;
    title?: string;
};

export default function ({ type = 'default', message }: Props) {
    // return toast.custom((_) => <div className={type}>{message}</div>);
    if (type == 'success') return toast.success(message);
    if (type == 'error') return toast.error(message);
    return toast(message);
}
