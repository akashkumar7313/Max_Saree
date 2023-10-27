import React from "react";
import { Link } from "react-router-dom";
import saleImgOne from "../../../assets/images/sale/best-deal-ever-instragramr-15-12-17.jpg"
import saleImgTwo from "../../../assets/images/sale/website_desktop_banner_4_e550685d-b953-4898-96a2-d29d1e0a7c79.webp"
import saleImgThree from "../../../assets/images/sale/1684480506_MTY2MzYwODY3MV9NVFkxTnpFd05qRXpNbDlXVmtKVlRVUmpkMHBUTlhkaWJXTTlMbXB3Wnc9PS5qcGc=.jpg"
import Image from "../../designLayouts/Image";

const Sale = () => {
  return (
    <div className="py-14 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
      <div className="w-full md:w-2/3 lg:w-1/2 h-full">
        <Link to="/shop">
          <Image className="h-full w-full object-cover" imgSrc={saleImgOne} />
        </Link>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        <div className="h-1/2 w-full">
          <Link to="/shop">
            <Image className="h-full w-full object-cover" imgSrc={saleImgTwo} />
          </Link>
        </div>
        <div className="h-1/2 w-full">
          <Link to="/shop">
            <Image
              className="h-full w-full object-cover"
              imgSrc={saleImgThree}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sale;
