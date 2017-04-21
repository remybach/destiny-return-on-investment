import React from 'react';

class AmazonAffiliateGameLinks extends React.Component {

  constructor(props) {
    super(props);

    const affiliateLinks = {
      GBP: {
        PS4: '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=remybach-21&marketplace=amazon&region=GB&placement=B06XTRJG7L&asins=B06XTRJG7L&linkId=&show_border=true&link_opens_in_new_window=true',
        XB: '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=remybach-21&marketplace=amazon&region=GB&placement=B06XTQB13S&asins=B06XTQB13S&linkId=&show_border=true&link_opens_in_new_window=true',
        PC: '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=GB&source=ac&ref=tf_til&ad_type=product_link&tracking_id=remybach-21&marketplace=amazon&region=GB&placement=B06XTPY6FV&asins=B06XTPY6FV&linkId=&show_border=true&link_opens_in_new_window=true'
      },
      USD: {
        PS4: '//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=remybach-20&marketplace=amazon&region=US&placement=B06XX6Y26M&asins=B06XX6Y26M&linkId=349e58d8f113427f52cf614748fd00f8&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066C0&bg_color=FFFFFF',
        XB: '//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=remybach-20&marketplace=amazon&region=US&placement=B06XPLD1C6&asins=B06XPLD1C6&linkId=90478099783342666dbf6a9f561a37cd&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff',
        PC: '//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=remybach-20&marketplace=amazon&region=US&placement=B06XPPQD2V&asins=B06XPPQD2V&linkId=27d33a950493a5d841d824e13c17898a&show_border=false&link_opens_in_new_window=false&price_color=333333&title_color=0066c0&bg_color=ffffff'
      }
    };

    this.state = {
      selectedAffiliateLinks: (props.currency && affiliateLinks[props.currency]) ? affiliateLinks[props.currency] : null
    };

    this.frameStyle = {
      width: '120px',
      height: '240px'
    };
  }

  renderAffiliateLink(src) {
    return (<iframe style={ this.frameStyle } marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src={src} key={src}></iframe> );
  }

  render() {
    let affiliateLinks = [];

    if (this.state.selectedAffiliateLinks) {
      affiliateLinks.push(this.renderAffiliateLink(this.state.selectedAffiliateLinks.PS4));
      affiliateLinks.push(this.renderAffiliateLink(this.state.selectedAffiliateLinks.XB));
      affiliateLinks.push(this.renderAffiliateLink(this.state.selectedAffiliateLinks.PC));
    }

    return (
      <div className="amazon-affiliate">
        { affiliateLinks }
      </div>
    );
  }
}

export default AmazonAffiliateGameLinks;