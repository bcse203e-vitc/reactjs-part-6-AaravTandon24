import React from "react";

const SkillSelection = ({ skills, onSelectSkill }) => {
  return (
    <section className="skill-selection">
      <h2>Choose a Skill to Learn</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card"
            onClick={() => onSelectSkill(skill.id)}
          >
            <div className="skill-icon">{skill.icon}</div>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillSelection;
