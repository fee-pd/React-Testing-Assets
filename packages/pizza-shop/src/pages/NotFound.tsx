import React from 'react';

import {InfoBlock} from '../components';

import notFoundImg from '../assets/img/notFound.jpg'

const NotFound:React.FC = () => {
    return (
        <>
            <InfoBlock
                title="Nothing was found"
                description="Sorry, this page is not on our site."
                img={notFoundImg}
            />
        </>
    );
};

export default NotFound;
