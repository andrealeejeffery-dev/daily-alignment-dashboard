import React, { useEffect, useMemo, useState } from "react";

export default function App() {
  const today = new Date().toISOString().split("T")[0];

  const emotionOptions = [
    {
      level: 1,
      name: "Fear",
      prompt: "What feels most scary or uncertain right now?",
      affirmation:
        "Money is safe to have in my life and I am learning to trust my financial future.",
      mantra: "I Am Safe With Money",
    },
    {
      level: 2,
      name: "Unworthiness",
      prompt: "Where do I need to remember my value today?",
      affirmation:
        "I am worthy of financial abundance and it is safe for me to receive more money.",
      mantra: "I Am Worthy of Wealth",
    },
    {
      level: 3,
      name: "Jealousy",
      prompt: "What does this feeling show me that I deeply desire?",
      affirmation:
        "Other people’s wealth shows me what is possible for me too.",
      mantra: "There Is More Than Enough",
    },
    {
      level: 4,
      name: "Hatred",
      prompt: "What pain is sitting underneath this intensity?",
      affirmation:
        "I release resentment around money and open myself to healthier financial beliefs.",
      mantra: "I Release Money Resentment",
    },
    {
      level: 5,
      name: "Anger",
      prompt: "What boundary, need, or truth wants to be heard?",
      affirmation:
        "I channel my energy into creating a stronger and more empowered financial future.",
      mantra: "I Use My Power Wisely",
    },
    {
      level: 6,
      name: "Discouraged",
      prompt: "What would help me feel supported right now?",
      affirmation:
        "Even small financial steps today are building my future wealth.",
      mantra: "Every Step Builds Wealth",
    },
    {
      level: 7,
      name: "Blame",
      prompt: "Where can I gently take my power back?",
      affirmation:
        "I release blame and take back my power to create a better financial reality.",
      mantra: "I Take My Power Back",
    },
    {
      level: 8,
      name: "Worry",
      prompt: "What am I trying to control right now?",
      affirmation:
        "Everything is working out for me financially and I am supported in new ways.",
      mantra: "Everything Always Works Out for Me",
    },
    {
      level: 9,
      name: "Doubt",
      prompt: "What small sign can I notice that things are improving?",
      affirmation:
        "I am learning how money works and I trust myself to improve my finances.",
      mantra: "I Trust Myself With Money",
    },
    {
      level: 10,
      name: "Disappointment",
      prompt: "What expectation can I soften or reframe today?",
      affirmation:
        "Every experience is guiding me toward wiser financial decisions.",
      mantra: "This Is Leading Me Higher",
    },
    {
      level: 11,
      name: "Frustration",
      prompt: "What is not flowing, and what small adjustment could help?",
      affirmation:
        "I am finding easier and smarter ways to manage and grow my money.",
      mantra: "Money Gets Easier for Me",
    },
    {
      level: 12,
      name: "Annoyance",
      prompt: "What would help me feel calmer and less reactive?",
      affirmation:
        "I choose calm and clarity as I move toward financial stability.",
      mantra: "I Choose Financial Calm",
    },
    {
      level: 13,
      name: "Acceptance",
      prompt: "What can I allow to be as it is today?",
      affirmation:
        "I accept where I am financially and choose to grow from here.",
      mantra: "I Am Ready to Grow",
    },
    {
      level: 14,
      name: "Contentment",
      prompt: "What is already good in my life right now?",
      affirmation:
        "I appreciate the money I have and welcome more into my life.",
      mantra: "I Appreciate and Attract More",
    },
    {
      level: 15,
      name: "Satisfaction",
      prompt: "What am I proud of or pleased with today?",
      affirmation: "I am proud of the financial progress I am making.",
      mantra: "I Celebrate My Financial Progress",
    },
    {
      level: 16,
      name: "Hopefulness",
      prompt: "What feels newly possible for me?",
      affirmation:
        "New financial opportunities are beginning to open up for me.",
      mantra: "Good Financial Things Are Coming",
    },
    {
      level: 17,
      name: "Optimism",
      prompt: "What positive outcome am I ready to expect?",
      affirmation:
        "I expect positive financial outcomes and welcome abundance.",
      mantra: "I Expect Financial Good",
    },
    {
      level: 18,
      name: "Excitement",
      prompt: "What am I looking forward to creating or receiving?",
      affirmation: "Money is flowing into my life in new and exciting ways.",
      mantra: "Money Is Flowing to Me",
    },
    {
      level: 19,
      name: "Passion",
      prompt: "What lights me up and deserves more of my attention?",
      affirmation:
        "I love creating value and receiving money for the value I bring.",
      mantra: "I Am Paid for My Value",
    },
    {
      level: 20,
      name: "Happiness",
      prompt: "What is bringing joy into my day today?",
      affirmation:
        "I enjoy having money and using it to create a beautiful life.",
      mantra: "Money Supports My Joy",
    },
    {
      level: 21,
      name: "Freedom and Love",
      prompt: "How can I express more love, freedom, and trust today?",
      affirmation:
        "Money flows to me easily and supports the freedom I desire.",
      mantra: "I Am Financially Free",
    },
  ];

  const [date, setDate] = useState(today);
  const [selectedLevel, setSelectedLevel] = useState(13);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem("feelGoodEmotionEntries");
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error("Could not load saved entries", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feelGoodEmotionEntries", JSON.stringify(entries));
  }, [entries]);

  const selectedEmotion = emotionOptions.find(
    (item) => item.level === selectedLevel
  );
  const nextEmotion = emotionOptions.find(
    (item) => item.level === selectedLevel + 1
  );

  const saveEntry = () => {
    const newEntry = {
      date,
      level: selectedEmotion.level,
      emotion: selectedEmotion.name,
      affirmation: selectedEmotion.affirmation,
      mantra: selectedEmotion.mantra,
      note,
    };

    const updatedEntries = [
      ...entries.filter((entry) => entry.date !== date),
      newEntry,
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    setEntries(updatedEntries);
    setNote("");
  };

  const deleteEntry = (entryDate) => {
    setEntries(entries.filter((entry) => entry.date !== entryDate));
  };

  const averageLevel = useMemo(() => {
    if (entries.length === 0) return 0;
    const total = entries.reduce((sum, entry) => sum + entry.level, 0);
    return (total / entries.length).toFixed(1);
  }, [entries]);

  const topEmotion = useMemo(() => {
    if (entries.length === 0) return "—";
    const counts = {};
    entries.forEach((entry) => {
      counts[entry.emotion] = (counts[entry.emotion] || 0) + 1;
    });

    let mostCommon = "—";
    let highestCount = 0;

    Object.keys(counts).forEach((emotion) => {
      if (counts[emotion] > highestCount) {
        highestCount = counts[emotion];
        mostCommon = emotion;
      }
    });

    return mostCommon;
  }, [entries]);

  const recentEntries = [...entries]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7);

  const insight = useMemo(() => {
    if (entries.length === 0)
      return "Start with today’s check-in and begin noticing your emotional patterns.";
    if (Number(averageLevel) >= 18)
      return "You are trending in a beautifully elevated direction. Keep nurturing what is working.";
    if (Number(averageLevel) >= 13)
      return "You are building momentum. Keep supporting yourself with gentle daily alignment.";
    if (Number(averageLevel) >= 8)
      return "You are in a meaningful transition zone. Small shifts can create powerful movement upward.";
    return "This may be a season for softness, support, and simple daily emotional care.";
  }, [averageLevel, entries.length]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div>
            <div style={styles.kicker}>Feel Good F'n Emotional Scale</div>
            <h1 style={styles.title}>Daily Alignment Dashboard</h1>
            <p style={styles.subtitle}>
              Track where you are on your 21-emotion journey and gently guide
              yourself upward.
            </p>
          </div>
          <div style={styles.heroPill}>Member Tool ✨</div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Average level</div>
            <div style={styles.statValue}>{averageLevel || "0.0"}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Most common emotion</div>
            <div style={styles.statValueSmall}>{topEmotion}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Entries saved</div>
            <div style={styles.statValue}>{entries.length}</div>
          </div>
        </div>

        <div style={styles.mainGrid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Today’s Emotional Check-In</h2>

            <label style={styles.label}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>
              Where are you on the scale today?
            </label>
            <div style={styles.scaleBox}>
              {emotionOptions
                .slice()
                .reverse()
                .map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setSelectedLevel(item.level)}
                    style={{
                      ...styles.scaleButton,
                      ...(selectedLevel === item.level
                        ? styles.scaleButtonActive
                        : {}),
                    }}
                  >
                    <span style={styles.scaleNumber}>{item.level}</span>
                    <span style={styles.scaleText}>{item.name}</span>
                  </button>
                ))}
            </div>
          </div>

          <div style={styles.sideColumn}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Selected Emotion</h2>
              <div style={styles.selectedEmotionBox}>
                <div style={styles.selectedLevel}>
                  Level {selectedEmotion.level}
                </div>
                <div style={styles.selectedName}>{selectedEmotion.name}</div>
              </div>

              <div style={styles.sectionLabel}>Reflection prompt</div>
              <div style={styles.promptBox}>{selectedEmotion.prompt}</div>

              <div style={styles.sectionLabel}>Financial affirmation</div>
              <div style={styles.affirmationBox}>
                {selectedEmotion.affirmation}
              </div>

              <div style={styles.sectionLabel}>Recommended mantra</div>
              <div style={styles.promptBox}>{selectedEmotion.mantra}</div>

              <div style={styles.sectionLabel}>Next emotional step</div>
              {nextEmotion ? (
                <div style={styles.nextStepBox}>
                  <div style={styles.nextStepLevel}>
                    Level {nextEmotion.level}
                  </div>
                  <div style={styles.nextStepName}>{nextEmotion.name}</div>
                  <div style={styles.nextStepPrompt}>{nextEmotion.prompt}</div>
                </div>
              ) : (
                <div style={styles.nextStepBox}>
                  <div style={styles.nextStepName}>
                    You’re at the highest emotional level.
                  </div>
                  <div style={styles.nextStepPrompt}>
                    Celebrate your alignment, appreciation, and freedom today.
                  </div>
                </div>
              )}

              <label style={styles.label}>Your reflection</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a few thoughts about how you feel today..."
                rows="4"
                style={styles.textarea}
              />

              <button onClick={saveEntry} style={styles.primaryButton}>
                Save Today’s Alignment
              </button>
            </div>
          </div>
        </div>

        <div style={styles.lowerGrid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Last 7 Check-Ins</h2>
            {recentEntries.length === 0 ? (
              <p style={styles.emptyText}>
                Your recent trend will appear here after your first entry.
              </p>
            ) : (
              <div style={styles.chartWrap}>
                {recentEntries.map((entry) => (
                  <div key={entry.date} style={styles.barGroup}>
                    <div style={styles.barEmotion}>{entry.level}</div>
                    <div style={styles.barTrack}>
                      <div
                        style={{
                          ...styles.barFill,
                          height: `${Math.max(20, entry.level * 5)}px`,
                        }}
                      />
                    </div>
                    <div style={styles.barDate}>{entry.date.slice(5)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Insight</h2>
            <div style={styles.insightBox}>{insight}</div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>History</h2>
          {entries.length === 0 ? (
            <p style={styles.emptyText}>
              No entries yet. Start by saving today’s alignment.
            </p>
          ) : (
            <div style={styles.historyList}>
              {entries.map((entry) => (
                <div key={entry.date} style={styles.historyItem}>
                  <div>
                    <div style={styles.historyTopLine}>
                      <strong>{entry.date}</strong> — Level {entry.level}:{" "}
                      {entry.emotion}
                    </div>
                    <div style={styles.historyAffirmation}>
                      {entry.affirmation}
                    </div>
                    <div style={styles.historyMantra}>
                      Suggested mantra: {entry.mantra}
                    </div>
                    {entry.note ? (
                      <div style={styles.historyNote}>{entry.note}</div>
                    ) : null}
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.date)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #fff7f4 0%, #fffaf0 35%, #fdf3ff 100%)",
    padding: "28px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  hero: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,248,228,0.96))",
    border: "1px solid #f1dfb2",
    boxShadow: "0 10px 30px rgba(183, 149, 70, 0.12)",
    borderRadius: "24px",
    padding: "28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "22px",
  },
  kicker: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: "#b58a2f",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  title: {
    margin: 0,
    fontSize: "34px",
    color: "#7d5a16",
  },
  subtitle: {
    marginTop: "10px",
    marginBottom: 0,
    color: "#6f6a63",
    maxWidth: "680px",
    lineHeight: 1.5,
  },
  heroPill: {
    background: "linear-gradient(135deg, #f8e7a5, #e6c76c)",
    color: "#6e5112",
    padding: "12px 16px",
    borderRadius: "999px",
    fontWeight: "bold",
    boxShadow: "0 6px 18px rgba(212, 175, 55, 0.22)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "22px",
  },
  statCard: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "20px",
    padding: "22px",
    border: "1px solid #f0e4c2",
    boxShadow: "0 8px 22px rgba(80, 60, 20, 0.06)",
  },
  statLabel: {
    color: "#8d7d62",
    fontSize: "14px",
    marginBottom: "8px",
  },
  statValue: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#7d5a16",
  },
  statValueSmall: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#7d5a16",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 0.9fr",
    gap: "22px",
    alignItems: "start",
    marginBottom: "22px",
  },
  sideColumn: {
    display: "grid",
    gap: "22px",
  },
  lowerGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 0.8fr",
    gap: "22px",
    marginBottom: "22px",
  },
  card: {
    background: "rgba(255,255,255,0.94)",
    borderRadius: "22px",
    padding: "24px",
    border: "1px solid #f0e4c2",
    boxShadow: "0 10px 24px rgba(80, 60, 20, 0.06)",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "18px",
    color: "#7d5a16",
  },
  label: {
    display: "block",
    marginTop: "14px",
    marginBottom: "8px",
    color: "#6a6259",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #ecd9aa",
    background: "#fffdf8",
    boxSizing: "border-box",
  },
  scaleBox: {
    display: "grid",
    gap: "8px",
    maxHeight: "640px",
    overflowY: "auto",
    paddingRight: "4px",
  },
  scaleButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "1px solid #ecd9aa",
    borderRadius: "14px",
    background: "#fffdf8",
    padding: "12px 14px",
    cursor: "pointer",
    textAlign: "left",
  },
  scaleButtonActive: {
    background: "linear-gradient(135deg, #fff4cf, #fde9fb)",
    border: "1px solid #d7b55f",
    boxShadow: "0 8px 18px rgba(212, 175, 55, 0.16)",
  },
  scaleNumber: {
    minWidth: "34px",
    height: "34px",
    borderRadius: "999px",
    background: "#f8edd0",
    color: "#7d5a16",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  scaleText: {
    color: "#6a5b45",
    fontWeight: "bold",
  },
  selectedEmotionBox: {
    background: "linear-gradient(135deg, #fff7e3, #fdf0ff)",
    borderRadius: "18px",
    padding: "18px",
    border: "1px solid #f1dfb2",
    marginBottom: "16px",
  },
  selectedLevel: {
    fontSize: "13px",
    color: "#b58a2f",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  selectedName: {
    fontSize: "28px",
    color: "#6e5112",
    fontWeight: "bold",
  },
  sectionLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#b58a2f",
    fontWeight: "bold",
    marginTop: "12px",
    marginBottom: "8px",
  },
  promptBox: {
    background: "#fffdf8",
    border: "1px solid #ecd9aa",
    borderRadius: "14px",
    padding: "14px",
    color: "#665b4d",
    lineHeight: 1.5,
  },
  affirmationBox: {
    background: "#fffdf8",
    border: "1px solid #ecd9aa",
    borderRadius: "14px",
    padding: "14px",
    color: "#665b4d",
    lineHeight: 1.5,
  },
  nextStepBox: {
    background: "linear-gradient(135deg, #fff8e8, #fff)",
    border: "1px solid #f0e0bb",
    borderRadius: "16px",
    padding: "14px",
    color: "#665b4d",
  },
  nextStepLevel: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#b58a2f",
    fontWeight: "bold",
    marginBottom: "6px",
  },
  nextStepName: {
    fontSize: "20px",
    color: "#6e5112",
    fontWeight: "bold",
    marginBottom: "6px",
  },
  nextStepPrompt: {
    lineHeight: 1.5,
    color: "#665b4d",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #ecd9aa",
    background: "#fffdf8",
    boxSizing: "border-box",
    resize: "vertical",
  },
  primaryButton: {
    marginTop: "18px",
    border: "none",
    borderRadius: "14px",
    padding: "14px 18px",
    background: "linear-gradient(135deg, #d6af45, #f6e6a3)",
    color: "#5d4611",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 10px 18px rgba(212, 175, 55, 0.18)",
  },
  chartWrap: {
    display: "flex",
    alignItems: "flex-end",
    gap: "12px",
    minHeight: "180px",
    overflowX: "auto",
    paddingTop: "12px",
  },
  barGroup: {
    minWidth: "54px",
    textAlign: "center",
  },
  barEmotion: {
    marginBottom: "8px",
    color: "#7d5a16",
    fontWeight: "bold",
  },
  barTrack: {
    height: "118px",
    background: "#fbf4df",
    borderRadius: "16px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: "6px",
  },
  barFill: {
    width: "30px",
    borderRadius: "12px 12px 8px 8px",
    background: "linear-gradient(180deg, #f4df8f, #d7a8ef)",
  },
  barDate: {
    fontSize: "12px",
    color: "#8d7d62",
    marginTop: "8px",
  },
  insightBox: {
    background: "linear-gradient(135deg, #fff8e8, #fff)",
    border: "1px solid #f0e0bb",
    borderRadius: "16px",
    padding: "16px",
    color: "#665b4d",
    lineHeight: 1.5,
  },
  historyList: {
    display: "grid",
    gap: "12px",
  },
  historyItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "18px",
    alignItems: "flex-start",
    border: "1px solid #f0e4c2",
    borderRadius: "18px",
    padding: "16px",
    background: "#fffdf9",
  },
  historyTopLine: {
    color: "#5f564d",
    marginBottom: "6px",
  },
  historyAffirmation: {
    color: "#9b7f3a",
    fontSize: "14px",
    marginBottom: "6px",
  },
  historyMantra: {
    color: "#7d5a16",
    fontSize: "13px",
    marginBottom: "6px",
    fontWeight: "bold",
  },
  historyNote: {
    color: "#6f6a63",
    fontSize: "14px",
    lineHeight: 1.5,
  },
  deleteButton: {
    border: "none",
    background: "#f7d9df",
    color: "#7d4050",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
  },
  emptyText: {
    color: "#8d7d62",
  },
};
