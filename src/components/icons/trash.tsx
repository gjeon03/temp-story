interface Props {
  size?: number | string;
  color?: string;
}

export default function TrashIcon({ size = 20, color = "white" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.59146 1.87499H11.4093C11.5897 1.87487 11.7468 1.87477 11.8951 1.89846C12.4812 1.99205 12.9884 2.35759 13.2625 2.884C13.3319 3.01724 13.3814 3.16631 13.4384 3.33742L13.5314 3.6165C13.5471 3.66374 13.5516 3.67712 13.5554 3.68765C13.7014 4.09108 14.0797 4.3638 14.5086 4.37467C14.5199 4.37495 14.5337 4.375 14.5837 4.375H17.0837C17.4289 4.375 17.7087 4.65482 17.7087 5C17.7087 5.34518 17.4289 5.625 17.0837 5.625H2.91699C2.57181 5.625 2.29199 5.34518 2.29199 5C2.29199 4.65482 2.57181 4.375 2.91699 4.375H5.41706C5.4671 4.375 5.48091 4.37495 5.49219 4.37467C5.92106 4.3638 6.29941 4.0911 6.44534 3.68767C6.44918 3.67706 6.4536 3.66398 6.46942 3.6165L6.56242 3.33744C6.61934 3.16634 6.66893 3.01725 6.73831 2.884C7.01243 2.35759 7.5196 1.99205 8.10568 1.89846C8.25403 1.87477 8.41113 1.87487 8.59146 1.87499ZM7.50712 4.375C7.55004 4.29082 7.58808 4.20334 7.62081 4.11287C7.63074 4.0854 7.64049 4.05615 7.65301 4.01858L7.73618 3.76907C7.81215 3.54115 7.82965 3.49466 7.847 3.46133C7.93837 3.28586 8.10743 3.16402 8.30279 3.13282C8.33989 3.1269 8.38952 3.125 8.62978 3.125H11.371C11.6113 3.125 11.6609 3.1269 11.698 3.13282C11.8934 3.16402 12.0624 3.28587 12.1538 3.46133C12.1711 3.49466 12.1886 3.54114 12.2646 3.76907L12.3477 4.01843L12.38 4.11289C12.4127 4.20335 12.4508 4.29082 12.4937 4.375H7.50712Z"
        fill={color}
      />
      <path
        d="M4.92957 7.04176C4.90661 6.69735 4.60879 6.43676 4.26438 6.45972C3.91996 6.48268 3.65937 6.7805 3.68234 7.12491L4.06854 12.918C4.13979 13.987 4.19734 14.8504 4.33232 15.528C4.47265 16.2324 4.71133 16.8208 5.20433 17.282C5.69732 17.7432 6.30028 17.9423 7.01249 18.0354C7.69751 18.125 8.56286 18.125 9.63416 18.125H10.3666C11.4379 18.125 12.3033 18.125 12.9883 18.0354C13.7005 17.9423 14.3035 17.7432 14.7965 17.282C15.2895 16.8208 15.5281 16.2324 15.6685 15.528C15.8035 14.8504 15.861 13.987 15.9322 12.918L16.3185 7.12491C16.3414 6.7805 16.0808 6.48268 15.7364 6.45972C15.392 6.43676 15.0942 6.69735 15.0712 7.04176L14.6879 12.791C14.6131 13.9142 14.5597 14.6957 14.4426 15.2838C14.3289 15.8541 14.1703 16.1561 13.9425 16.3692C13.7146 16.5824 13.4028 16.7205 12.8262 16.796C12.2317 16.8737 11.4483 16.875 10.3226 16.875H9.67816C8.55246 16.875 7.76912 16.8737 7.17462 16.796C6.59795 16.7205 6.28615 16.5824 6.05831 16.3692C5.83046 16.1561 5.67185 15.8541 5.55823 15.2838C5.44109 14.6957 5.38773 13.9142 5.31285 12.791L4.92957 7.04176Z"
        fill={color}
      />
      <path
        d="M7.85488 8.54477C8.19834 8.51042 8.50462 8.76101 8.53897 9.10448L8.95563 13.2711C8.98998 13.6146 8.73939 13.9209 8.39593 13.9552C8.05246 13.9896 7.74618 13.739 7.71184 13.3955L7.29517 9.22886C7.26082 8.88539 7.51141 8.57912 7.85488 8.54477Z"
        fill={color}
      />
      <path
        d="M12.1459 8.54477C12.4894 8.57912 12.74 8.88539 12.7056 9.22886L12.289 13.3955C12.2546 13.739 11.9483 13.9896 11.6049 13.9552C11.2614 13.9209 11.0108 13.6146 11.0452 13.2711L11.4618 9.10448C11.4962 8.76101 11.8025 8.51042 12.1459 8.54477Z"
        fill={color}
      />
    </svg>
  );
}