import React from 'react';
import Layout from '@theme/Layout';

import Head from '@docusaurus/Head';
import ContactUs from '../components/Landing/ContactUs';

const Contact = () => {
    return (
        <Layout title={"Community"} >
            <Head>
                <script type="text/javascript" src="https://js-eu1.hsforms.net/forms/embed/v2.js" />
            </Head>
            <ContactUs />
        </Layout>
    );
};

export default Contact;
