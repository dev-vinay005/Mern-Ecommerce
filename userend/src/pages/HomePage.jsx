import React from "react";
import HeroSection from "../components/layout/HeroSection";
import AboutSection from "../components/layout/AboutSection";
import CategorySection from "../components/layout/CategoriesSection";
import ProductSection from "../components/layout/ProductSection";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <CategorySection />
            <ProductSection />
        </>
    )
}

export default HomePage
