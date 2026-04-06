'use client';
// import globalStyles from "../ui/globals.css";
import designStyles from "../ui/designspaceLayout.module.css";

const themes = {
    brown: {
        btna: "#6b4f3f",
        btnb: "#c3967c",
        background: "#c3967c",
        accent: "#4d3419",
        foreground: "linear-gradient(135deg, #fceabb 0%, #6b4f3f 100%)",
        foregroundTransparent: "rgba(255, 205, 151, 0.7)",
        foreground2: "#d7b69a",
        light: "#fff8f0",
    },
    green: {
        btna: "#7c9f7e",
        btnb: "#3d6b5f",
        background: "#7c9f7e",
        accent: "#263a37",
        foreground: "linear-gradient(135deg, #d4f1d4 0%, #4a7c5e 100%)",
        foregroundTransparent: "rgba(168, 213, 168, 0.7)",
        foreground2: "#b8ddb8",
        light: "#f0f8f0",
    },
    blue: {
        btna: "#6b8db5",
        btnb: "#adbaea",
        background: "#adbaea",
        accent: "#254469",
        foreground: "linear-gradient(135deg, #e9f4f8 0%, #a7aadf 100%)",
        foregroundTransparent: "rgba(191, 220, 232, 0.7)",
        foreground2: "#cee5ee",
        light: "#f4fafc",
    },
    pink: {
        btna: "#ffb5bf",
        btnb: "#ff8cb6",
        background: "#ffb5bf",
        accent: "#772246",
        foreground: "linear-gradient(135deg, #ffd9e8 0%, #ff8cb6 100%)",
        foregroundTransparent: "rgba(246, 183, 207, 0.7)",
        foreground2: "#f8c6da",
        light: "#fff5fa",
    },
    grey : {
        btna: "#d1d1d1",
        btnb: "#909090",
        background: "#c1c1c1",
        accent: "#333333",
        foreground: "linear-gradient(135deg, #f0f0f0 0%, #909090 100%)",
        foregroundTransparent: "rgba(211, 211, 211, 0.7)",
        foreground2: "#e0e0e0",
        light: "#f8f8f8",
    },
};

const handleThemeChange = (theme: keyof typeof themes) => {
    const root = document.documentElement;
    const selectedTheme = themes[theme];
    root.style.setProperty('--color-background', selectedTheme.background);
    root.style.setProperty('--color-accent', selectedTheme.accent);
    root.style.setProperty('--color-foreground', selectedTheme.foreground);
    root.style.setProperty('--color-foreground-transparent', selectedTheme.foregroundTransparent);
    root.style.setProperty('--color-foreground-2', selectedTheme.foreground2);
    root.style.setProperty('--color-light', selectedTheme.light);
};

export default function DesignSettings() {
    return (
        <div>
            <h1>Design Settings</h1>
            <p>Here you can customize the look and feel of your Pomodoro timer.</p>
            <h3>Choose a Theme:</h3>
            <div className={designStyles.colorBtns}>
                {Object.keys(themes).map((theme) => (
                    <button 
                        key={theme} 
                        className={designStyles.colorBtn}
                        style={{
                            backgroundImage: `linear-gradient(135deg, ${themes[theme as keyof typeof themes].btna} 0%, ${themes[theme as keyof typeof themes].btnb} 100%)`
                        }}
                        onClick={() => handleThemeChange(theme as keyof typeof themes)}
                    >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                ))}
            </div>

            {/* Add design customization options here */}
        </div>
    );
}