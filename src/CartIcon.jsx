const CartIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 34 30"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.92"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeMiterlimit="22.926"
  >
    <path d="M14.9,23.4c1.6,0,2.8,1.3,2.8,2.8c0,1.6-1.3,2.8-2.8,2.8S12,27.8,12,26.2C12,24.7,13.3,23.4,14.9,23.4z" />
    <path d="M25.8,23.4c1.6,0,2.8,1.3,2.8,2.8c0,1.6-1.3,2.8-2.8,2.8c-1.6,0-2.8-1.3-2.8-2.8C22.9,24.7,24.2,23.4,25.8,23.4z" />
    <polyline points="1,1 6.7,1 12.1,18.4 29.9,18.4" />
    <line x1="11.1" y1="13.8" x2="31.8" y2="13.8" />
    <line x1="9.7" y1="9.2" x2="33" y2="9.2" />
  </svg>
);

export default CartIcon;
