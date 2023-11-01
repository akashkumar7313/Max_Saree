import React, { useState } from 'react'
import SareePagination from "../../components/pageProps/shopPage/SareePagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";


const SareeCollection = () => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const itemsPerPageFromBanner = (itemsPerPage) => {
        setItemsPerPage(itemsPerPage);
    };


    return (
        <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="Saree Collection" />
            {/* ================= Products Start here =================== */}
            <div className="w-full h-full flex pb-20 gap-10">
                {/* <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div> */}
                <div>
                    <div className="w-full mdl:w-[100%] lgl:w-[100%] h-full flex flex-col gap-10">
                        <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
                        <SareePagination itemsPerPage={itemsPerPage} />
                    </div>
                </div>
            </div>
            {/* ================= Products End here ===================== */}
        </div>
    );
};

export default SareeCollection;