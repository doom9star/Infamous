import React, { ReactElement } from "react";
import "../styles/landing.scss";
import ExNavbar from "../components/ExNavbar";

interface FloatingFtrProps {
  title: string;
  description: string;
  icon: ReactElement;
  styles?: object;
}

function FloatingFtr({ title, description, icon, styles }: FloatingFtrProps) {
  return (
    <div className="floating-ftr" style={styles}>
      {icon}
      <span className="floating-ftr-title">{title}</span>
      <span className="floating-ftr-description">{description}</span>
    </div>
  );
}

function Landing() {
  return (
    <>
      <ExNavbar />
      <div className="landing-container">
        <FloatingFtr
          title="Make Stories"
          description="Create stories with some of our high class tools, bring out your creativity!"
          icon={<i className="fas fa-book"></i>}
          styles={{
            top: "10%",
            left: "5%",
          }}
        />
        <FloatingFtr
          title="Surf Anonymously"
          description="Toggle anonymous option to surf and do stuffs anonymously! People can't find you!"
          icon={<i className="fas fa-user-secret"></i>}
          styles={{
            bottom: "5%",
            left: "10%",
          }}
        />
        <FloatingFtr
          title="Publish Stories"
          description="Publish your stories with our crazy free tier and start making money now!"
          icon={<i className="fas fa-cloud"></i>}
          styles={{
            bottom: "15%",
            right: "10%",
          }}
        />
        <div className="landing-container-poster">
          <span>In</span>
          <span>famous</span>
        </div>
      </div>
    </>
  );
}

export default Landing;
