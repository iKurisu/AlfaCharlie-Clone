import React from "react";
import "./Privacy.scss";
import FooterArt from "components/FooterArt";

const Privacy = (): JSX.Element => (
  <React.Fragment>
    <article className="privacy">
      <header className="privacy-header">
        <h3 className="privacy-title">Privacy Policy</h3>
      </header>
      <div className="privacy-content">
        <p>
          Alfa Charlie LLC Privacy Policy
          <br />
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from
          www.alfacharlie.co (the “Site”).
        </p>
        <h3>INFORMATION WE COLLECT</h3>
        <p>
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We refer to this
          automatically-collected information as “Device Information.”
        </p>
        <p>We collect Device Information using the following technologies:</p>
        <p>
          – “Cookies” are data files that are placed on your device or computer
          and often include an anonymous unique identifier. For more information
          about cookies, and how to disable cookies, visit
          http://www.allaboutcookies.org.
        </p>
        <p>
          – “Log files” track actions occurring on the Site, and collect data
          including your IP address, browser type, Internet service provider,
          referring/exit pages, and date/time stamps.
        </p>
        <p>
          – “Web beacons,” “tags,” and “pixels” are electronic files used to
          record information about how you browse the Site.
        </p>
        <p>
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking both about Device Information and Order Information.
        </p>
        <h3>HOW DO WE USE YOUR PERSONAL INFORMATION?</h3>
        <p>
          We use the Order Information that we collect generally to fulfill any
          orders placed through the Site (including processing your payment
          information, arranging for shipping, and providing you with invoices
          and/or order confirmations). Additionally, we use this Order
          Information to:
          <br />
          Communicate with you;
          <br />
          Screen our orders for potential risk or fraud; and
          <br />
          When in line with the preferences you have shared with us, provide you
          with information or advertising relating to our products or services.
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
        </p>
        <h3>SHARING YOUR PERSONAL INFORMATION</h3>
        <p>
          We share your Personal Information with third parties to help us use
          your Personal Information, as described above. For example, we use
          Shopify to power our online store–you can read more about how Shopify
          uses your Personal Information here:
          https://www.shopify.com/legal/privacy. We also use Google Analytics to
          help us understand how our customers use the Site–you can read more
          about how Google uses your Personal Information here:
          https://www.google.com/intl/en/policies/privacy/. You can also opt-out
          of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
        </p>
        <p>
          Finally, we may also share your Personal Information to comply with
          applicable laws and regulations, to respond to a subpoena, search
          warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
        </p>
        <h3>DO NOT TRACK</h3>
        <p>
          Please note that we do not alter our Site’s data collection and use
          practices when we see a Do Not Track signal from your browser.
        </p>
        <h3>DATA RETENTION</h3>
        <p>
          When you place an order through the Site, we will maintain your Order
          Information for our records unless and until you ask us to delete this
          information.
        </p>
        <h3>CHANGES</h3>
        <p>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
        </p>
        <h3>CONTACT US</h3>
        <p>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e-mail at hello@alfacharlie.co or by mail using the details
          provided below:
        </p>
        <p>
          4966 Santa Monica Ave Suite D, San Diego, CA, 92107, United States
        </p>
      </div>
    </article>
    <FooterArt />
  </React.Fragment>
);

export default Privacy;
