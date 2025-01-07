import React from "react";
import { Link } from "react-router-dom";
import "./TechnologyPage.css"; // Stil importieren
import { useTranslation } from "react-i18next";

const TechnologyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="technology-page">
      <div className="content-container">
        <h1 className="tech-title">{t("technology_title")}</h1>
        <p className="tech-description">
          {t("technology_description")}
        </p>

        <h2 className="tech-subtitle">{t("technologies_used")}</h2>
        <div className="tech-list">
          {/* Technologie 1: React */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="React"
              className="tech-icon"
            />
            <h3>React</h3>
            <p>{t("react_description")}</p>
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 2: Node.js */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
              alt="Node.js"
              className="tech-icon"
            />
            <h3>Node.js</h3>
            <p>{t("nodejs_description")}</p>
            <a
              href="https://nodejs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 3: AWS Cognito */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5c/AWS_Simple_Icons_AWS_Cloud.svg"
              alt="AWS Cognito"
              className="tech-icon"
            />
            <h3>AWS Cognito</h3>
            <p>{t("cognito_description")}</p>
            <a
              href="https://aws.amazon.com/cognito/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 4: Ansible */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/24/Ansible_logo.svg"
              alt="Ansible"
              className="tech-icon"
            />
            <h3>Ansible</h3>
            <p>{t("ansible_description")}</p>
            <a
              href="https://www.ansible.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 5: GitHub */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              alt="GitHub"
              className="tech-icon"
            />
            <h3>GitHub</h3>
            <p>{t("github_description")}</p>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 6: Unity */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg"
              alt="Unity"
              className="tech-icon"
            />
            <h3>Unity</h3>
            <p>{t("unity_description")}</p>
            <a
              href="https://unity.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 7: Blender */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Blender-dynamic-clay.png"
              alt="Blender"
              className="tech-icon"
            />
            <h3>Blender</h3>
            <p>{t("blender_description")}</p>
            <a
              href="https://www.blender.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 8: Vite */}
          <div className="tech-item">
            <img
              src="https://vitejs.dev/logo.svg"
              alt="Vite"
              className="tech-icon"
            />
            <h3>Vite</h3>
            <p>{t("vite_description")}</p>
            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 9: CapCut */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Capcut-logo.svg"
              alt="CapCut"
              className="tech-icon"
            />
            <h3>CapCut</h3>
            <p>{t("capcut_description")}</p>
            <a
              href="https://www.capcut.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 10: JavaScript */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png"
              alt="JavaScript"
              className="tech-icon"
            />
            <h3>JavaScript</h3>
            <p>{t("javascript_description")}</p>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>

          {/* Technologie 11: HCL */}
          <div className="tech-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/HashiCorp_Logo_no_text.png"
              alt="HCL"
              className="tech-icon"
            />
            <h3>HCL</h3>
            <p>{t("hcl_description")}</p>
            <a
              href="https://www.hashicorp.com/products/terraform"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-link"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="tech-buttons">
          <Link to="/about-us" className="tech-button">
            {t("about_us")}
          </Link>
          <Link to="/impressum" className="tech-button">
            {t("impressum")}
          </Link>
          <Link to="/" className="tech-button back-home">
            {t("back_to_home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;
