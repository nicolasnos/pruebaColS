import "../styles/FooterV2.css";
import pc from "../assets/images/pc.svg";
import cellphone from "../assets/images/Cellphone.svg";
import mariaPaulaLogo from "../assets/images/logoMariaPaula.svg";
import kiosco from "../assets/images/Kiosco.svg";

const FooterV2 = () => {
  return (
    <footer>
      <p className="info-p">
        Recuerda que nuestros canales digitales están disponibles
        <strong>24/7</strong>
      </p>
      <div className="first-line">
        <div className="element1">
          <a
            href="https://www.colsanitas.com/en/servicios-oficina-virtual"
            target="_blank"
            rel="noopener noreferrer"
          >
            <figure>
              <img src={pc} alt="Computador portátil o laptop" />
            </figure>
          </a>
          <a
            href="https://www.colsanitas.com/en/servicios-oficina-virtual"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Oficina virtual</p>
          </a>
        </div>

        <div className="element2">
          <a
            href="https://www.colsanitas.com/en/colsanitas-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <figure>
              <img src={cellphone} alt="celular" />
            </figure>
          </a>
          <a
            href="https://www.colsanitas.com/en/colsanitas-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>App Colsanitas</p>
          </a>
        </div>

        <div className="element3">
          <a
            href="https://www.colsanitas.com/en/kioscos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <figure className="kiosco">
              <img src={kiosco} alt="Kiosco" />
              <svg
                width="45"
                height="45"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 24307">
                  <path
                    id="Vector"
                    d="M1 20.4011V39.9997H21.0595V20.4011H1Z"
                    fill="url(#paint0_linear_504_10)"
                  />
                  <path
                    id="Vector_2"
                    d="M21.1499 19.8991L24.8309 2.42721L25.3424 0H5.28284L1.0603 19.8991H21.1499ZM7.03805 1.76524C7.05147 1.70862 7.08344 1.65812 7.12888 1.62177C7.17432 1.58542 7.23061 1.56531 7.28879 1.56465H22.2532C22.2906 1.56542 22.3273 1.57489 22.3603 1.59229C22.3934 1.6097 22.422 1.63458 22.4438 1.66494C22.4605 1.69574 22.4692 1.73021 22.4692 1.76524C22.4692 1.80027 22.4605 1.83474 22.4438 1.86554L19.1139 17.9132C19.099 17.969 19.0666 18.0186 19.0215 18.0546C18.9763 18.0907 18.9209 18.1115 18.8632 18.1138H3.93885C3.90006 18.113 3.86192 18.1036 3.82722 18.0863C3.79252 18.0689 3.76212 18.0441 3.73825 18.0135C3.69663 17.9554 3.6787 17.8837 3.6881 17.8129L7.03805 1.76524Z"
                    fill="url(#paint1_linear_504_10)"
                  />
                  <path
                    id="Vector_3"
                    d="M26.9372 39.8352V38.8322H23.3666C23.2336 38.8322 23.106 38.7794 23.012 38.6853C22.9179 38.5913 22.8651 38.4637 22.8651 38.3307L22.8651 20.1701C22.8601 20.1335 22.8601 20.0963 22.8651 20.0597L26.877 0.702272L25.874 0.150635L21.6013 20.1701L21.6013 39.8352H26.9372Z"
                    fill="url(#paint2_linear_504_10)"
                  />
                  <path
                    id="Vector_4"
                    d="M18.7132 17.5724L21.9428 2.06641H7.48986L4.25024 17.5724H18.7132Z"
                    fill="url(#paint3_linear_504_10)"
                  />
                  <g id="Rectangle 6874" filter="url(#filter0_bd_504_10)">
                    <path
                      d="M7.26151 2H22.1187L18.6901 17.7143H4.11865L7.26151 2Z"
                      fill="#D9D9D9"
                      fillOpacity="0.5"
                      shapeRendering="crispEdges"
                    />
                  </g>
                  <path
                    id="Vector_5"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.9676 23.3208C18.2699 23.3208 18.5149 23.5658 18.5149 23.868C18.5149 24.1702 18.2699 24.4153 17.9676 24.4153H10.3065C10.0043 24.4153 9.75928 24.1702 9.75928 23.868C9.75928 23.5658 10.0043 23.3208 10.3065 23.3208H17.9676ZM17.9676 26.0569C18.2699 26.0569 18.5149 26.3019 18.5149 26.6041C18.5149 26.9064 18.2699 27.1514 17.9676 27.1514H10.3065C10.0043 27.1514 9.75928 26.9064 9.75928 26.6041C9.75928 26.3019 10.0043 26.0569 10.3065 26.0569H17.9676Z"
                    fill="white"
                  />
                  <path
                    id="Vector_6"
                    d="M15.2314 27.6989C14.627 27.6989 14.137 27.2089 14.137 26.6045C14.137 26 14.627 25.51 15.2314 25.51C15.8359 25.51 16.3259 26 16.3259 26.6045C16.3259 27.2089 15.8359 27.6989 15.2314 27.6989Z"
                    fill="url(#paint4_linear_504_10)"
                  />
                  <path
                    id="Vector_7"
                    d="M16.3261 24.9628C15.7217 24.9628 15.2317 24.4728 15.2317 23.8684C15.2317 23.2639 15.7217 22.7739 16.3261 22.7739C16.9306 22.7739 17.4206 23.2639 17.4206 23.8684C17.4206 24.4728 16.9306 24.9628 16.3261 24.9628Z"
                    fill="url(#paint5_linear_504_10)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_bd_504_10"
                    x="0.118652"
                    y="-2"
                    width="26"
                    height="27.7144"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                    <feComposite
                      in2="SourceAlpha"
                      operator="in"
                      result="effect1_backgroundBlur_504_10"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_backgroundBlur_504_10"
                      result="effect2_dropShadow_504_10"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_504_10"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_504_10"
                    x1="4.00895"
                    y1="23.5793"
                    x2="13.1119"
                    y2="37.9865"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#49C3B1" />
                    <stop offset="1" stopColor="#0071A3" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_504_10"
                    x1="4.70264"
                    y1="3.22688"
                    x2="13.1714"
                    y2="19.2067"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#49C3B1" />
                    <stop offset="1" stopColor="#0071A3" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_504_10"
                    x1="22.4017"
                    y1="6.58598"
                    x2="30.5368"
                    y2="8.27737"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#49C3B1" />
                    <stop offset="1" stopColor="#0071A3" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_504_10"
                    x1="6.90414"
                    y1="4.5809"
                    x2="13.746"
                    y2="16.6524"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#49C3B1" />
                    <stop offset="1" stopColor="#0071A3" />
                  </linearGradient>
                  <linearGradient
                    id="paint4_linear_504_10"
                    x1="14.4653"
                    y1="25.865"
                    x2="15.492"
                    y2="27.4525"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#49C3B1" />
                    <stop offset="1" stopColor="#0071A3" />
                  </linearGradient>
                  <linearGradient
                    id="paint5_linear_504_10"
                    x1="15.56"
                    y1="23.1289"
                    x2="16.5867"
                    y2="24.7164"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#49C3B1" />
                    <stop offset="1" stopColor="#0071A3" />
                  </linearGradient>
                </defs>
              </svg>
            </figure>
          </a>
          <a
            href="https://www.colsanitas.com/en/kioscos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Kioscos</p>
          </a>
        </div>
      </div>

      <div className="second-line">
        <div className="element4">
          <a
            href="https://wa.me/573103107676"
            target="_blank"
            rel="noopener noreferrer"
          >
            <figure>
              <img src={mariaPaulaLogo} alt="María Paula Logo" />
            </figure>
          </a>
          <a
            href="https://wa.me/573103107676"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <p>
                <strong>Whatsapp</strong>
              </p>
              <p>(+57) 3103107676</p>
            </div>
          </a>
        </div>

        <div className="element5">
          <a
            href="https://www.colsanitas.com/en/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <p>
                <strong>Asistente virtual María Paula</strong>
              </p>
              <p>en Colsanitas.com</p>
            </div>
          </a>
        </div>

        <div className="element6">
          <a
            href="https://www.facebook.com/ColsanitasMedicinaPrepagada"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <p>
                <strong>Facebook</strong>
              </p>
              <p>
                <strong>Messenger</strong>
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className="functionalities">
        <p>
          Conoce todas las funcionalidades
          <a
            href="https://www.colsanitas.com/documents/44695/268305337/ago_Canales_oficinas_op.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Aquí</strong>
          </a>
        </p>
      </div>

      <p className="copyright">© Copyright 2023 Colsanitas</p>
    </footer>
  );
};

export { FooterV2 };
