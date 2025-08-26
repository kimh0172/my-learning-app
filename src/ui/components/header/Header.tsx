import React from "react";
import { Sun, Moon, FileDown, Download, Upload } from "lucide-react";
import { Button } from "../controls/Button";

export const Header: React.FC<{
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onExportMd: () => void;
  onExportJson: () => void;
  onImportJson: (file: File | null) => void;
}> = ({ theme, onToggleTheme, onExportMd, onExportJson, onImportJson }) => {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand">
          <div>
            <h1 className="h1">Web App Học – Lộ trình 6 tháng (2h/tuần)</h1>
            <p className="muted">
              Từ Beginner → WebApp Fullstack (Kanban Lite)
            </p>
          </div>
        </div>
        <div className="header__actions">
          <Button onClick={onExportMd} variant="outline" className="btn-inline">
            <FileDown className="icon" /> Export .md
          </Button>
          <Button onClick={onExportJson} variant="soft" className="btn-inline">
            <Download className="icon" /> Export .json
          </Button>
          <label className="btn-label">
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => onImportJson(e.target.files?.[0] ?? null)}
            />
            <Button variant="soft" className="btn-inline">
              <Upload className="icon" /> Import JSON
            </Button>
          </label>
          <Button
            onClick={onToggleTheme}
            variant="outline"
            className="btn-inline"
          >
            {theme === "light" ? (
              <>
                <Moon className="icon" /> Dark
              </>
            ) : (
              <>
                <Sun className="icon" /> Light
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
