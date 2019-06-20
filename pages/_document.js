import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MainDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <title>Welcome</title>
                    <link rel="stylesheet" href="/_next/static/style.css"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
            
        )
    }
}