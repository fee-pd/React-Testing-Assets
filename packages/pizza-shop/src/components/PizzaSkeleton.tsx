import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaSkeleton: React.FC = () => (
    <div className="pizza-skeleton">
        <ContentLoader
            speed={2}
            width={280}
            height={465}
            viewBox="0 0 280 465"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <circle cx="144" cy="124" r="124" />
            <rect x="0" y="267" rx="4" ry="4" width="280" height="27" />
            <rect x="0" y="314" rx="10" ry="10" width="280" height="87" />
            <rect x="130" y="420" rx="22" ry="22" width="152" height="45" />
            <rect x="0" y="430" rx="4" ry="4" width="91" height="27" />
        </ContentLoader>
    </div>
);