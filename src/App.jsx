import React, { useMemo, useState } from 'react';
import './App.css';

const plants = [
  {
    id: 'monstera',
    name: 'Monstera',
    emoji: '🌿',
    difficulty: 'Easy',
    water: 'Every 7 days',
    light: 'Bright indirect light',
    nextWatering: 'Tomorrow, 09:00',
    tip: 'Let the top 2–3 cm of soil dry before watering. Avoid direct afternoon sun.',
    warning: 'Yellow leaves can mean overwatering.',
  },
  {
    id: 'basil',
    name: 'Basil',
    emoji: '🌱',
    difficulty: 'Medium',
    water: 'Every 2–3 days',
    light: 'Sunny windowsill',
    nextWatering: 'Today, 18:00',
    tip: 'Keep the soil slightly moist and pinch the top leaves to encourage growth.',
    warning: 'Wilting usually means it needs water quickly.',
  },
  {
    id: 'cactus',
    name: 'Cactus',
    emoji: '🌵',
    difficulty: 'Very easy',
    water: 'Every 3–4 weeks',
    light: 'Direct sunlight',
    nextWatering: 'In 18 days',
    tip: 'Water rarely but thoroughly. Make sure the pot drains well.',
    warning: 'Soft or mushy parts often mean too much water.',
  },
  {
    id: 'orchid',
    name: 'Orchid',
    emoji: '🌸',
    difficulty: 'Advanced',
    water: 'Every 7–10 days',
    light: 'Bright indirect light',
    nextWatering: 'Friday, 10:00',
    tip: 'Use a pot with drainage and avoid leaving roots sitting in water.',
    warning: 'Direct sunlight can burn the leaves.',
  },
];

const steps = [
  'Welcome',
  'Add plant',
  'Care plan',
  'Reminders',
  'Tips',
  'Done',
];

function Progress({ step }) {
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>Prototype flow</span>
        <span>{step + 1}/6</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

function PhoneFrame({ children, step }) {
  return (
    <div className="page-bg">
      <div className="phone">
        <div className="phone-notch" />
        <Progress step={step} />
        {children}
      </div>
    </div>
  );
}

function Button({ children, onClick, variant = 'primary', disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${
        variant === 'primary' ? 'btn-primary' : 'btn-secondary'
      }`}
    >
      {children}
    </button>
  );
}

function Screen({ children, footer }) {
  return (
    <div className="screen">
      <div className="screen-content fade-in">{children}</div>
      <div className="footer">{footer}</div>
    </div>
  );
}

function Welcome({ next }) {
  return (
    <Screen footer={<Button onClick={next}>Start plant care plan →</Button>}>
      <div className="brand">🌿 Your Green Thumb</div>
      <div className="hero-card">
        <div className="hero-emoji">🪴</div>
        <h1>Plant care without the guesswork.</h1>
        <p>
          Add a plant, get simple care tips, and see when it needs water, light,
          or attention.
        </p>
      </div>
      <div className="feature-grid">
        <div className="feature-card">
          <div>💧</div>
          <strong>Watering reminders</strong>
        </div>
        <div className="feature-card">
          <div>☀️</div>
          <strong>Light guidance</strong>
        </div>
        <div className="feature-card">
          <div>✨</div>
          <strong>Simple tips</strong>
        </div>
      </div>
    </Screen>
  );
}

function AddPlant({ selectedPlant, setSelectedPlant, next, back }) {
  return (
    <Screen
      footer={
        <>
          <Button onClick={next} disabled={!selectedPlant}>
            Create care plan →
          </Button>
          <Button variant="secondary" onClick={back}>
            ← Back
          </Button>
        </>
      }
    >
      <div className="top-row">
        <div>
          <p className="eyebrow">Step 1</p>
          <h2>Which plant do you want help with?</h2>
        </div>
        <div className="top-icon">🌱</div>
      </div>

      <div className="plant-list">
        {plants.map((plant) => {
          const active = selectedPlant?.id === plant.id;
          return (
            <button
              key={plant.id}
              className={`plant-card ${active ? 'plant-card-active' : ''}`}
              onClick={() => setSelectedPlant(plant)}
            >
              <span className="plant-emoji">{plant.emoji}</span>
              <span className="plant-info">
                <strong>{plant.name}</strong>
                <small>
                  {plant.difficulty} care · {plant.water}
                </small>
              </span>
              <span className="check">{active ? '✓' : ''}</span>
            </button>
          );
        })}
      </div>
    </Screen>
  );
}

function CarePlan({ plant, next, back }) {
  return (
    <Screen
      footer={
        <>
          <Button onClick={next}>View reminder →</Button>
          <Button variant="secondary" onClick={back}>
            ← Back
          </Button>
        </>
      }
    >
      <div className="main-card">
        <div className="plant-header">
          <div className="big-emoji">{plant.emoji}</div>
          <div>
            <p className="eyebrow">Care plan ready</p>
            <h2>{plant.name}</h2>
            <p className="muted">Difficulty: {plant.difficulty}</p>
          </div>
        </div>
        <div className="two-grid">
          <div className="mini-card blue">
            <div>💧</div>
            <small>Water</small>
            <strong>{plant.water}</strong>
          </div>
          <div className="mini-card yellow">
            <div>☀️</div>
            <small>Light</small>
            <strong>{plant.light}</strong>
          </div>
        </div>
      </div>

      <div className="dark-card">
        <strong>✅ Personalized recommendation</strong>
        <p>{plant.tip}</p>
      </div>
    </Screen>
  );
}

function Reminder({ plant, next, back }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <Screen
      footer={
        <>
          <Button onClick={next}>See care tips →</Button>
          <Button variant="secondary" onClick={back}>
            ← Back
          </Button>
        </>
      }
    >
      <p className="eyebrow">Step 3</p>
      <h2>Your next reminder</h2>
      <p className="muted space-bottom">
        Get reminders before your plant starts to wilt or dry out.
      </p>

      <div className="main-card">
        <div className="reminder-row">
          <div className="bell">🔔</div>
          <div className="reminder-text">
            <strong>Water {plant.name}</strong>
            <small>{plant.nextWatering}</small>
          </div>
          <button
            className={`toggle ${enabled ? 'toggle-on' : ''}`}
            onClick={() => setEnabled(!enabled)}
          >
            <span />
          </button>
        </div>
        <div className="note green">
          Reminder is {enabled ? 'enabled' : 'disabled'}. Notifications are
          simulated in this prototype.
        </div>
      </div>

      <div className="two-grid">
        <div className="info-card">
          <small>Routine</small>
          <strong>{plant.water}</strong>
        </div>
        <div className="info-card">
          <small>Status</small>
          <strong>On track</strong>
        </div>
      </div>
    </Screen>
  );
}

function Tips({ plant, next, back }) {
  return (
    <Screen
      footer={
        <>
          <Button onClick={next}>Finish setup →</Button>
          <Button variant="secondary" onClick={back}>
            ← Back
          </Button>
        </>
      }
    >
      <p className="eyebrow">Step 4</p>
      <h2>Quick care tips</h2>
      <p className="muted space-bottom">
        Simple care advice you can follow right away.
      </p>

      <div className="tip-card">
        <strong>💡 Best action today</strong>
        <p>{plant.tip}</p>
      </div>
      <div className="tip-card warning">
        <strong>✨ Watch out</strong>
        <p>{plant.warning}</p>
      </div>
      <div className="tip-card">
        <strong>🏠 Location tip</strong>
        <p>Place it where it receives {plant.light.toLowerCase()}.</p>
      </div>
    </Screen>
  );
}

function Done({ plant, restart, back }) {
  return (
    <Screen
      footer={
        <>
          <Button onClick={restart}>Test another plant</Button>
          <Button variant="secondary" onClick={back}>
            ← Back
          </Button>
        </>
      }
    >
      <div className="done">
        <div className="done-check">✓</div>
        <h2>Your care plan is ready.</h2>
        <p className="muted">
          {plant.name} has been added with watering reminders, light guidance,
          and quick care tips.
        </p>
      </div>
      <div className="main-card text-left">
        <p className="eyebrow">Participant question</p>
        <p>
          Would this type of app help you care for your plants more regularly?
          What would you change before using it in everyday life?
        </p>
      </div>
      <div className="note">
        <strong>Prototype limitation:</strong> This clickable prototype
        simulates the core app experience but does not store data or send real
        notifications.
      </div>
    </Screen>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);
  const plant = useMemo(() => selectedPlant || plants[0], [selectedPlant]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const restart = () => {
    setSelectedPlant(plants[0]);
    setStep(1);
  };

  return (
    <PhoneFrame step={step}>
      {step === 0 && <Welcome next={next} />}
      {step === 1 && (
        <AddPlant
          selectedPlant={selectedPlant}
          setSelectedPlant={setSelectedPlant}
          next={next}
          back={back}
        />
      )}
      {step === 2 && <CarePlan plant={plant} next={next} back={back} />}
      {step === 3 && <Reminder plant={plant} next={next} back={back} />}
      {step === 4 && <Tips plant={plant} next={next} back={back} />}
      {step === 5 && <Done plant={plant} restart={restart} back={back} />}
    </PhoneFrame>
  );
}
