import { UserContext } from "App";
import { useContext, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Results = () => {
  const { quizData, setQuizData, userData } = useContext(UserContext);

  const [compCollapsed, setCompCollapsed] = useState(true);
  const [convCollapsed, setConvCollapsed] = useState(true);
  const [compatibilityQs, setCompatibilityQs] = useState([]);
  const [conversationQs, setConversationQs] = useState([]);

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const compArr = [];
    const convArr = [];

    for (const item in quizData) {
      if (quizData[item].type !== "noEffect") {
        compArr.push(quizData[item]);
      } else {
        convArr.push(quizData[item]);
      }
    }

    setCompatibilityQs(compArr);
    setConversationQs(convArr);
  }, [quizData]);

  const handleExpand = (list) => {
    if (list === "compatibility") {
      setCompCollapsed(!compCollapsed);
    } else if (list === "conversation") {
      setConvCollapsed(!convCollapsed);
    }
  };

  const handleSelect = (ans) => {
    if (selectedAnswers.includes(ans)) {
      setSelectedAnswers((prevState) => {
        let newState = [...prevState];
        let filteredArr = newState.filter((i) => i !== ans);
        return filteredArr;
      });
    } else {
      setSelectedAnswers((prevState) => {
        let newState = [...prevState];
        newState.push(ans);
        return newState;
      });
    }
  };

  const saveSelected = () => {
    for (const q in quizData) {
      if (selectedAnswers.includes(quizData[q])) {
        setQuizData((prevState) => {
          let newState = { ...prevState };
          selectedAnswers.forEach((ans) => {
            newState[`q${ans.key}`].show = true;
          });
          return newState;
        });
      } else {
        setQuizData((prevState) => {
          let newState = { ...prevState };
          newState[q].show = false;
          return newState;
        });
      }
    }
  };

  const images = {
    seriousDater: {
      path: require("../../assets/results/seriousDater.png"),
      alt: "A man proposing to a woman."
    },
    casualDater: {
      path: require("../../assets/results/casualDater.png"),
      alt: "A couple sitting on the couch while cheering."
    },
    goWithTheFlow: {
      path: require("../../assets/results/goWithTheFlow.png"), // missing
      alt: "A couple enjoying a picnic in the sun."
    },
    workingOnMyself: {
      path: require("../../assets/results/workingOnMyself.png"), // missing
      alt: "Woman sitting on a chair, reading a book."
    }
  };

  if (!userData.daterType || !userData.daterDesc) {
    return <Navigate to="/vibecheck" />;
  } else {
    return (
      <div className={styles.container}>
        <h2>Your dater type result is:</h2>
        <h1>
          {userData.daterType
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^./, (str) => str.toUpperCase())}
        </h1>

        <img src={images[userData.daterType].path} alt={images[userData.daterType].alt} />

        <p className={styles.description}>{userData.daterDesc}</p>
        <p className={styles.instruction}>Add your answers to your profile below!</p>

        <div className={styles.questionSection}>
          <div className={styles.questionHeader}>
            <h4>Compatibility Questions</h4>
            <button
              onClick={() => {
                handleExpand("compatibility");
              }}
            >
              {compCollapsed ? `+` : `-`}
            </button>
          </div>
          <ul className={compCollapsed ? styles.collapsed : null}>
            <button>Select All</button>
            {compatibilityQs.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => {
                    handleSelect(item);
                  }}
                >
                  {selectedAnswers.includes(item) ? `checked` : `unchecked`}
                </button>
                <p className={styles.question}>{item.question}</p>
                <p className={styles.answer}>{item.answer}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.questionSection}>
          <div className={styles.questionHeader}>
            <h4>Conversation Starters</h4>
            <button
              onClick={() => {
                handleExpand("conversation");
              }}
            >
              {convCollapsed ? `+` : `-`}
            </button>
          </div>
          <ul className={convCollapsed ? styles.collapsed : null}>
            <button>Select All</button>
            {conversationQs.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => {
                    handleSelect(item);
                  }}
                >
                  {selectedAnswers.includes(item) ? `checked` : `unchecked`}
                </button>
                <p className={styles.question}>{item.question}</p>
                <p className={styles.answer}>{item.answer}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.addAnswers}>
          <p>Note: Selected answers will be added to profile</p>
          <button onClick={saveSelected}>Add answers to profile {">>"}</button>
          <Link to="/">Cancel</Link>
        </div>
      </div>
    );
  }
};

export default Results;