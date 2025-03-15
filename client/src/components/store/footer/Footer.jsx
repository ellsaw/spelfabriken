import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-golden-xl pt-golden-md px-golden-lg">
      <div className="max-w-[1024px] mx-auto">
        <div className="mb-golden-2xl flex flex-col md:flex-row md:items-center md:justify-evenly">
        <section className="">
          <h2 className="text-lg font-medium leading-12">Kundservice</h2>
          <ul className="flex flex-col gap-golden-sm">
            <li>
              <Link
                to="mailto:support@spelfabriken.se"
                className="flex gap-golden-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.875rem"
                  height="1.875rem"
                  viewBox="0 0 56 56"
                >
                  <path
                    fill="currentColor"
                    d="M9.484 48.191h37.734c4.22 0 6.657-2.437 6.657-7.265V15.05c0-4.805-2.46-7.242-7.36-7.242H8.782c-4.195 0-6.656 2.414-6.656 7.242v25.875c0 4.851 2.484 7.265 7.36 7.265m15.727-19.007L7.516 11.723c.515-.211 1.124-.328 1.851-.328h37.29c.726 0 1.359.117 1.898.375L30.883 29.184c-1.008 1.007-1.899 1.453-2.836 1.453c-.938 0-1.828-.446-2.836-1.453M5.71 40.926v-26.11l13.476 13.22L5.734 41.323c-.023-.117-.023-.258-.023-.398m44.578-25.852v26.18L36.906 28.035L50.29 14.887zM9.367 44.606c-.68 0-1.242-.094-1.734-.305l14.015-13.852l1.524 1.5c1.64 1.617 3.21 2.297 4.875 2.297c1.64 0 3.234-.68 4.875-2.297l1.523-1.5l13.993 13.828c-.493.235-1.102.328-1.782.328Z"
                  />
                </svg>
                support@spelfabriken.se
              </Link>
            </li>
            <li>
              <Link to="tel:0812345678" className="flex gap-golden-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.875rem"
                  height="1.875rem"
                  viewBox="0 0 56 56"
                >
                  <path
                    fill="currentColor"
                    d="M39.156 50.934c4.078 0 6.774-1.102 9.164-3.774c.188-.187.352-.398.54-.586c1.406-1.57 2.062-3.117 2.062-4.593c0-1.688-.984-3.258-3.07-4.712l-6.82-4.734c-2.11-1.453-4.571-1.617-6.54.328l-1.804 1.805c-.54.539-1.008.563-1.547.234c-1.242-.797-3.797-3.023-5.532-4.757c-1.828-1.805-3.609-3.82-4.523-5.297c-.328-.54-.281-.985.258-1.524l1.781-1.805c1.969-1.968 1.805-4.453.352-6.538l-4.758-6.82c-1.43-2.087-3-3.048-4.688-3.071c-1.476-.024-3.023.656-4.593 2.062c-.211.188-.399.352-.61.516c-2.648 2.39-3.75 5.086-3.75 9.14c0 6.704 4.125 14.86 11.696 22.43c7.523 7.524 15.703 11.696 22.382 11.696m.024-3.61c-5.977.117-13.64-4.476-19.711-10.523c-6.117-6.094-10.922-14.016-10.805-19.992c.047-2.579.938-4.805 2.79-6.399c.14-.14.28-.258.444-.375c.68-.61 1.454-.937 2.11-.937c.703 0 1.312.257 1.758.96l4.547 6.82c.492.727.539 1.548-.188 2.274l-2.062 2.063c-1.641 1.617-1.5 3.586-.328 5.156c1.335 1.805 3.656 4.43 5.437 6.211c1.805 1.805 4.64 4.336 6.445 5.695c1.57 1.172 3.563 1.29 5.18-.328l2.062-2.062c.727-.727 1.524-.68 2.25-.211l6.82 4.547c.704.468.985 1.054.985 1.758c0 .68-.328 1.43-.96 2.132a6 6 0 0 1-.352.446c-1.617 1.828-3.844 2.718-6.422 2.765"
                  />
                </svg>
                08 123 456 78
              </Link>
            </li>
          </ul>
        </section>
        <section className="mt-golden-lg">
          <h2 className="text-lg font-medium leading-12">Om oss</h2>
          <ul className="flex flex-col gap-golden-xs">
            <li>
              <Link to="/">Försäljningsvillkor</Link>
            </li>
            <li>
                <Link to="/">Dataskyddspolicy</Link>
            </li>
            <li>
                <Link to="/">Cookiepolicy</Link>
            </li>
            <li>
                <Link to="/">Hållbarhetspolicy</Link>
            </li>
          </ul>
        </section>
        </div>
        <div className="*:w-auto *:h-4 flex flex-wrap justify-evenly gap-golden-md my-golden-lg">
          <img src="/src/assets/icons/footericons/postnord.svg" alt="Postnord" />
          <img src="/src/assets/icons/footericons/instabox.svg" alt="Instabox" />
          <img src="/src/assets/icons/footericons/dhl.svg" alt="DHL" />
          <img src="/src/assets/icons/footericons/budbee.svg" alt="Budbee" />
          <img src="/src/assets/icons/footericons/visa.svg" alt="Visa" />
          <img src="/src/assets/icons/footericons/paypal.svg" alt="PayPal" />
          <img src="/src/assets/icons/footericons/mastercard.svg" alt="Mastercard" />
          <img src="/src/assets/icons/footericons/amex.svg" alt="American Express" />
          <img src="/src/assets/icons/footericons/swish.svg" alt="Swish" />
        </div>
        <div>
            <p className="text-center text-xs font-light text-neutral-300">© Spelfabriken AB 2025</p>
        </div>
      </div>
    </footer>
  );
}
