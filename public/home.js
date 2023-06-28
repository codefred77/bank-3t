function Home() {
  return (
    <div className="container mt-5">

      <div className="row">
        <div className="col-md-4">
          <h3 style={{ color: 'white',
                       fontWeight: 'bold',
                       textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
                     }}>Welcome to Ultramar Bank!
          </h3>
          <img src="piggy.jpg" className="img-fluid shadow" alt="Bank" />
        </div>
        <div className="col-md-4">
          <h5 style={{
            marginLeft: '15px',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            marginTop: '40px'
          }}>Our core values:</h5>

          <ul style={{color:'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
            <li>Integrity - We uphold the highest standards of integrity in all our actions and decisions.</li>
            <li>Customer Centricity - We prioritize the needs and satisfaction of our customers above all else.</li>
            <li>Innovation - We continuously seek innovative solutions to provide the best banking experience.</li>
          </ul>
        </div>
        <div className="col-md-4">
          <h5 style={{
            marginLeft: '15px',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            marginTop: '40px'
          }}>Why Bank with Us?</h5>
          <p style={{ marginLeft: '15px', color:'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
            At Ultramar we strive to provide exceptional banking services tailored to your needs. We offer:
          </p>
          <ul style={{color:'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
            <li>Secure and reliable banking services</li>
            <li>Competitive interest rates</li>
            <li>Flexible account options</li>
            <li>Convenient online and mobile banking</li>
            <li>Excellent customer support</li>
          </ul>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <a href="#/CreateAccount/" className="btn btn-info btn-lg btn-block btn-3d">Create Account</a>
        </div>
        <div className="col-md-4">
          <a href="#/login/" className="btn btn-info btn-lg btn-block btn-3d">Login</a>
        </div>
        <div className="col-md-4">
          <a href="#/alldata/" className="btn btn-info btn-lg btn-block btn-3d">View All Data</a>
        </div>      
      </div>
      <div className="row mt-5">
        <div className="col-md-12" style={{ fontSize: '12px', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
          <h5 style={{
            color:'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
          }}>About Our Bank</h5>
          <p>
            Established in 1995, Our Bank has been a trusted financial institution for over two decades. 
            It all started with a vision to create a bank that would redefine the banking experience, putting 
            customers first and delivering innovative solutions.
          </p>
          <p>
            Since our humble beginnings, we have grown steadily, expanding our services, and building strong 
            relationships with our customers. Today, Our Bank serves over 1 million customers worldwide, 
            and our total assets exceed $10 billion. We take pride in being a leader in the industry, offering 
            cutting-edge financial products and personalized solutions to meet the diverse needs of our customers.
          </p>
          <p>
            Our success can be attributed to our commitment to excellence and our dedicated team of professionals. 
            We have assembled a talented group of individuals who share a passion for delivering exceptional service 
            and ensuring the financial success of our customers. At Our Bank, we believe in the power of relationships 
            and strive to foster long-lasting partnerships with our customers based on trust, transparency, and mutual 
            growth.
          </p>
          <p>
            As a member of the Federal Deposit Insurance Corporation (FDIC), your deposits with Our Bank are insured 
            up to the maximum limit, providing you with peace of mind and security. We adhere to strict regulatory 
            standards and employ state-of-the-art security measures to safeguard your financial information and 
            protect your privacy.
          </p>
          <p>
            Please note that the above story is fictional and created for illustrative purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}


