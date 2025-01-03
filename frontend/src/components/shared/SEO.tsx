import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title} | MSDEVSEC</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={`${title} | MSDEVSEC`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MSDEVSEC" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | MSDEVSEC`} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
