import React from 'react';

interface InfoBlockProps {
    title: string;
    description: string;
    img?: string;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ title, description, img } ) => {
    return (
        <div className="infoBlock">
            {img && <img src={img} alt={title} />}
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};