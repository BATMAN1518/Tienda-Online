import streamlit as st
import pandas as pd
import random

# --- 1. BASE DE DATOS DE TROPAS (REAL 100%) ---
stats_tropas = {
    "Helios": {
        "Infanteria": {
            1: {"Atq": 13, "Def": 16, "HP": 18, "Let": 12},
            2: {"Atq": 14, "Def": 17, "HP": 19, "Let": 13},
            3: {"Atq": 15, "Def": 18, "HP": 20, "Let": 14},
            4: {"Atq": 15, "Def": 19, "HP": 21, "Let": 15},
            5: {"Atq": 16, "Def": 22, "HP": 22, "Let": 15},
            6: {"Atq": 17, "Def": 23, "HP": 23, "Let": 16},
            7: {"Atq": 17, "Def": 24, "HP": 24, "Let": 16},
            8: {"Atq": 18, "Def": 25, "HP": 25, "Let": 17},
            9: {"Atq": 18, "Def": 27, "HP": 26, "Let": 17},
            10: {"Atq": 19, "Def": 28, "HP": 27, "Let": 18},
        },
        "Lancero": {
            1: {"Atq": 16, "Def": 14, "HP": 13, "Let": 17},
            2: {"Atq": 18, "Def": 15, "HP": 14, "Let": 18},
            3: {"Atq": 19, "Def": 16, "HP": 15, "Let": 19},
            4: {"Atq": 20, "Def": 16, "HP": 15, "Let": 20},
            5: {"Atq": 22, "Def": 17, "HP": 16, "Let": 21},
            6: {"Atq": 23, "Def": 17, "HP": 16, "Let": 22},
            7: {"Atq": 24, "Def": 18, "HP": 17, "Let": 23},
            8: {"Atq": 25, "Def": 19, "HP": 17, "Let": 24},
            9: {"Atq": 27, "Def": 19, "HP": 18, "Let": 25},
            10: {"Atq": 28, "Def": 21, "HP": 20, "Let": 26},
        },
        "Tirador": {
            1: {"Atq": 17, "Def": 13, "HP": 13, "Let": 18},
            2: {"Atq": 19, "Def": 14, "HP": 14, "Let": 19},
            3: {"Atq": 20, "Def": 15, "HP": 15, "Let": 20},
            4: {"Atq": 21, "Def": 16, "HP": 15, "Let": 21},
            5: {"Atq": 23, "Def": 16, "HP": 16, "Let": 22},
            6: {"Atq": 24, "Def": 17, "HP": 16, "Let": 23},
            7: {"Atq": 25, "Def": 18, "HP": 17, "Let": 24},
            8: {"Atq": 26, "Def": 19, "HP": 18, "Let": 25},
            9: {"Atq": 28, "Def": 19, "HP": 18, "Let": 26},
            10: {"Atq": 30, "Def": 21, "HP": 20, "Let": 27},
        }
    },
    "Normal": {
        "Infanteria": {
            1: {"Atq": 11, "Def": 14, "HP": 16, "Let": 10},
            2: {"Atq": 12, "Def": 16, "HP": 17, "Let": 11},
            3: {"Atq": 13, "Def": 17, "HP": 18, "Let": 12},
            4: {"Atq": 13, "Def": 18, "HP": 19, "Let": 13},
            5: {"Atq": 14, "Def": 20, "HP": 20, "Let": 13},
            6: {"Atq": 14, "Def": 21, "HP": 21, "Let": 13},
            7: {"Atq": 15, "Def": 22, "HP": 22, "Let": 14},
            8: {"Atq": 15, "Def": 23, "HP": 23, "Let": 15},
            9: {"Atq": 16, "Def": 25, "HP": 24, "Let": 15},
            10: {"Atq": 18, "Def": 26, "HP": 25, "Let": 16},
        },
        "Lancero": {
            1: {"Atq": 14, "Def": 12, "HP": 11, "Let": 15},
            2: {"Atq": 16, "Def": 13, "HP": 12, "Let": 16},
            3: {"Atq": 17, "Def": 14, "HP": 13, "Let": 17},
            4: {"Atq": 18, "Def": 14, "HP": 13, "Let": 18},
            5: {"Atq": 20, "Def": 15, "HP": 14, "Let": 19},
            6: {"Atq": 21, "Def": 15, "HP": 14, "Let": 20},
            7: {"Atq": 22, "Def": 16, "HP": 15, "Let": 21},
            8: {"Atq": 23, "Def": 17, "HP": 15, "Let": 22},
            9: {"Atq": 25, "Def": 17, "HP": 16, "Let": 23},
            10: {"Atq": 26, "Def": 19, "HP": 17, "Let": 24},
        },
        "Tirador": {
            1: {"Atq": 15, "Def": 11, "HP": 11, "Let": 16},
            2: {"Atq": 17, "Def": 12, "HP": 12, "Let": 17},
            3: {"Atq": 18, "Def": 13, "HP": 13, "Let": 18},
            4: {"Atq": 19, "Def": 14, "HP": 13, "Let": 19},
            5: {"Atq": 21, "Def": 14, "HP": 14, "Let": 20},
            6: {"Atq": 22, "Def": 15, "HP": 14, "Let": 21},
            7: {"Atq": 23, "Def": 15, "HP": 15, "Let": 22},
            8: {"Atq": 24, "Def": 16, "HP": 15, "Let": 23},
            9: {"Atq": 26, "Def": 17, "HP": 16, "Let": 24},
            10: {"Atq": 27, "Def": 19, "HP": 17, "Let": 25},
        }
    }
}


def calcular_stats_base(nivel_fc, is_helios, pct_inf, pct_lan, pct_tir):
    """Calcula la media ponderada de las estadísticas puras según la composición del rally."""
    tipo = "Helios" if is_helios else "Normal"

    if nivel_fc == 0:
        return {"Atq": 10.0, "Def": 10.0, "HP": 10.0, "Let": 10.0}

    s_inf = stats_tropas[tipo]["Infanteria"][nivel_fc]
    s_lan = stats_tropas[tipo]["Lancero"][nivel_fc]
    s_tir = stats_tropas[tipo]["Tirador"][nivel_fc]

    atq = (s_inf["Atq"] * pct_inf + s_lan["Atq"] * pct_lan + s_tir["Atq"] * pct_tir) / 100.0
    def_ = (s_inf["Def"] * pct_inf + s_lan["Def"] * pct_lan + s_tir["Def"] * pct_tir) / 100.0
    hp = (s_inf["HP"] * pct_inf + s_lan["HP"] * pct_lan + s_tir["HP"] * pct_tir) / 100.0
    let = (s_inf["Let"] * pct_inf + s_lan["Let"] * pct_lan + s_tir["Let"] * pct_tir) / 100.0

    return {"Atq": atq, "Def": def_, "HP": hp, "Let": let}


# --- 2. BASE DE DATOS DE HÉROES ---
datos_heroes = [
    {"Nombre": "Seigel", "Gen": 16, "Escala": 13.50, "Efecto": "25% Def y 25% Reflejo", "Buff_Dano_Base": 0,
     "Buff_Defensa": 50, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Ursar", "Gen": 16, "Escala": 13.50, "Efecto": "+25% Daño Lancero", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Aisling", "Gen": 16, "Escala": 13.50, "Efecto": "+25% Daño Tirador", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Hank", "Gen": 15, "Escala": 12.84, "Efecto": "-30% Atq Tirador Enemigo", "Buff_Dano_Base": 0,
     "Buff_Defensa": 30, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Estrella", "Gen": 15, "Escala": 12.84, "Efecto": "Debuff Dinámico", "Buff_Dano_Base": 0,
     "Buff_Defensa": 25, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Viveca", "Gen": 15, "Escala": 12.84, "Efecto": "+35% Daño Aliado", "Buff_Dano_Base": 35,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Elif", "Gen": 14, "Escala": 10.70, "Efecto": "Confusión / Control", "Buff_Dano_Base": 0,
     "Buff_Defensa": 20, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Dominic", "Gen": 14, "Escala": 10.70, "Efecto": "+25% Daño Lancero", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Cara", "Gen": 14, "Escala": 10.70, "Efecto": "+30% Daño Crítico", "Buff_Dano_Base": 30,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Gisela", "Gen": 13, "Escala": 8.92, "Efecto": "Absorción Daño Infantería", "Buff_Dano_Base": 0,
     "Buff_Defensa": 30, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Flora", "Gen": 13, "Escala": 8.92, "Efecto": "+30% Letalidad", "Buff_Dano_Base": 30, "Buff_Defensa": 0,
     "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Vulcanus", "Gen": 13, "Escala": 8.92, "Efecto": "Daño AoE Extremo", "Buff_Dano_Base": 35,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Hervor", "Gen": 12, "Escala": 7.43, "Efecto": "+30% Salud Aliada", "Buff_Dano_Base": 0,
     "Buff_Defensa": 30, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Karol", "Gen": 12, "Escala": 7.43, "Efecto": "-30% Ataque Enemigo", "Buff_Dano_Base": 0,
     "Buff_Defensa": 30, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Ligeia", "Gen": 12, "Escala": 7.43, "Efecto": "+30% Daño Aliado", "Buff_Dano_Base": 30,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Eleonora", "Gen": 11, "Escala": 6.19, "Efecto": "Reflejo de Daño", "Buff_Dano_Base": 0,
     "Buff_Defensa": 30, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Lloyd", "Gen": 11, "Escala": 6.19, "Efecto": "+25% Letalidad", "Buff_Dano_Base": 25, "Buff_Defensa": 0,
     "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Rufus", "Gen": 11, "Escala": 6.19, "Efecto": "Ignorar Def y +25% Daño", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Gregory", "Gen": 10, "Escala": 5.16, "Efecto": "+25% Defensa Aliada", "Buff_Dano_Base": 0,
     "Buff_Defensa": 25, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Freya", "Gen": 10, "Escala": 5.16, "Efecto": "+25% Daño Aliado", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Blanchette", "Gen": 10, "Escala": 5.16, "Efecto": "Daño AoE", "Buff_Dano_Base": 25, "Buff_Defensa": 0,
     "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Magnus", "Gen": 9, "Escala": 4.30, "Efecto": "+25% Atq y +50% Def", "Buff_Dano_Base": 25,
     "Buff_Defensa": 50, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Fred", "Gen": 9, "Escala": 4.30, "Efecto": "Daño escala por salud", "Buff_Dano_Base": 20,
     "Buff_Defensa": 15, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Xura", "Gen": 9, "Escala": 4.30, "Efecto": "Inhabilitación enemiga", "Buff_Dano_Base": 25,
     "Buff_Defensa": 10, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Gatot", "Gen": 8, "Escala": 3.58, "Efecto": "-30% Daño Recibido Infantería", "Buff_Dano_Base": 0,
     "Buff_Defensa": 30, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Sonya", "Gen": 8, "Escala": 3.58, "Efecto": "+20% Daño Aliado", "Buff_Dano_Base": 20, "Buff_Defensa": 0,
     "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Hendrik", "Gen": 8, "Escala": 3.58, "Efecto": "-25% Defensa Enemiga", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Edith", "Gen": 7, "Escala": 2.99, "Efecto": "-20% daño tirador enemigo", "Buff_Dano_Base": 20,
     "Buff_Defensa": 20, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Gordon", "Gen": 7, "Escala": 2.99, "Efecto": "+100% Daño Lancero c/2 turnos", "Buff_Dano_Base": 0,
     "Buff_Defensa": 20, "Buff_Dano_Turno": 100, "Turnos_Activacion": 2},
    {"Nombre": "Bradley", "Gen": 7, "Escala": 2.99, "Efecto": "+25% Ataque Global", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Wu Ming", "Gen": 6, "Escala": 2.49, "Efecto": "+25% Salud Aliado", "Buff_Dano_Base": 0,
     "Buff_Defensa": 25, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Renee", "Gen": 6, "Escala": 2.49, "Efecto": "+200% Daño Lancero c/2 turnos", "Buff_Dano_Base": 0,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 200, "Turnos_Activacion": 2},
    {"Nombre": "Wayne", "Gen": 6, "Escala": 2.49, "Efecto": "+100% ataque aliado c/4 turnos", "Buff_Dano_Base": 0,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 100, "Turnos_Activacion": 4},
    {"Nombre": "Hector", "Gen": 5, "Escala": 2.07, "Efecto": "40% prob -50% ataque enemigo", "Buff_Dano_Base": 0,
     "Buff_Defensa": 50, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Norah", "Gen": 5, "Escala": 2.07, "Efecto": "-15% ataque enemigo", "Buff_Dano_Base": 15,
     "Buff_Defensa": 15, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Gwen", "Gen": 5, "Escala": 2.07, "Efecto": "+25% Daño Aliado (Debuff)", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Ahmose", "Gen": 4, "Escala": 1.73, "Efecto": "-70% daño infanteria enemiga", "Buff_Dano_Base": 0,
     "Buff_Defensa": 100, "Buff_Dano_Turno": 0, "Turnos_Activacion": 7},
    {"Nombre": "Reina", "Gen": 4, "Escala": 1.73, "Efecto": "+30% Daño Aliado", "Buff_Dano_Base": 30, "Buff_Defensa": 0,
     "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Lynn", "Gen": 4, "Escala": 1.73, "Efecto": "+50% daño aliado (Joiner F2P)", "Buff_Dano_Base": 50,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Logan", "Gen": 3, "Escala": 1.44, "Efecto": "-20% ataque enemigo", "Buff_Dano_Base": 0,
     "Buff_Defensa": 20, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Mia", "Gen": 3, "Escala": 1.44, "Efecto": "+50% daño aliado (Joiner F2P)", "Buff_Dano_Base": 50,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Greg", "Gen": 3, "Escala": 1.44, "Efecto": "20% prob +40% daño aliado", "Buff_Dano_Base": 0,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 40, "Turnos_Activacion": 3},
    {"Nombre": "Flint", "Gen": 2, "Escala": 1.20, "Efecto": "+100% Daño de Infantería", "Buff_Dano_Base": 100,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Philly", "Gen": 2, "Escala": 1.20, "Efecto": "+15% daño aliado", "Buff_Dano_Base": 15,
     "Buff_Defensa": 10, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Alonso", "Gen": 2, "Escala": 1.20, "Efecto": "40% prob +50% Letalidad", "Buff_Dano_Base": 50,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Jeronimo", "Gen": 1, "Escala": 1.00, "Efecto": "+25% Daño Aliado", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Natalia", "Gen": 1, "Escala": 1.00, "Efecto": "40% prob -50% Daño Recibido", "Buff_Dano_Base": 0,
     "Buff_Defensa": 50, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Molly", "Gen": 1, "Escala": 1.00, "Efecto": "40% prob -50% Daño Recibido", "Buff_Dano_Base": 0,
     "Buff_Defensa": 50, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Zinman", "Gen": 1, "Escala": 1.00, "Efecto": "+20% Defensa Aliada", "Buff_Dano_Base": 0,
     "Buff_Defensa": 20, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Jessie", "Gen": 1, "Escala": 0.70, "Efecto": "+25% Daño Aliado", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Jasser", "Gen": 1, "Escala": 0.70, "Efecto": "+25% Daño Aliado", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Seo-yoon", "Gen": 1, "Escala": 0.70, "Efecto": "+25% Daño Aliado", "Buff_Dano_Base": 25,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Patrick", "Gen": 1, "Escala": 0.70, "Efecto": "+25% Salud Aliado", "Buff_Dano_Base": 0,
     "Buff_Defensa": 25, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Sergey", "Gen": 1, "Escala": 0.70, "Efecto": "-20% Daño Recibido", "Buff_Dano_Base": 0,
     "Buff_Defensa": 20, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Bahiti", "Gen": 1, "Escala": 0.70, "Efecto": "+20% Daño Tirador", "Buff_Dano_Base": 20,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1},
    {"Nombre": "Gina", "Gen": 1, "Escala": 0.70, "Efecto": "Velocidad de Marcha", "Buff_Dano_Base": 0,
     "Buff_Defensa": 0, "Buff_Dano_Turno": 0, "Turnos_Activacion": 1}
]

df = pd.DataFrame(datos_heroes)


def clasificar_modificadores(heroes_data):
    buff_atk, buff_def = 0.0, 0.0
    debuffs_vuln = {}
    for index, heroe in heroes_data.iterrows():
        efecto = str(heroe['Efecto']).lower()
        val_atk = float(heroe['Buff_Dano_Base']) / 100.0
        val_def = float(heroe['Buff_Defensa']) / 100.0

        if any(keyword in efecto for keyword in ["enemigo", "recibido", "debuff", "enemiga"]):
            nombre = heroe['Nombre']
            if nombre in debuffs_vuln:
                debuffs_vuln[nombre] = max(debuffs_vuln[nombre], val_atk + val_def)
            else:
                debuffs_vuln[nombre] = val_atk + val_def
        else:
            buff_atk += val_atk
            buff_def += val_def
    return buff_atk, buff_def, debuffs_vuln


# --- INTERFAZ GRÁFICA ---
st.set_page_config(page_title="WOS Simulador Definitivo", layout="wide")
st.title("⚙️ Motor de Batalla Fraccionario (Base Stats y 39 Turnos)")

# Expertos SVS
svs_activado = st.checkbox("🔥 Activar Expertos SVS (Rómulo y Valeria: +40% Stats Globales)")
global_multiplier = 1.40 if svs_activado else 1.00

c1, c2, c3 = st.columns(3)

with c1:
    st.subheader("🛡️ Tu Tríada Aliada")
    cap1 = st.selectbox("Líder 1", df['Nombre'], index=21, key="c1")
    cap2 = st.selectbox("Líder 2", df['Nombre'], index=28, key="c2")
    cap3 = st.selectbox("Líder 3", df['Nombre'], index=26, key="c3")

    st.subheader("👥 Tus 4 Joiners")
    j1 = st.selectbox("Slot 1 Aliado", df['Nombre'], index=48, key="j1")
    j2 = st.selectbox("Slot 2 Aliado", df['Nombre'], index=35, key="j2")
    j3 = st.selectbox("Slot 3 Aliado", df['Nombre'], index=35, key="j3")
    j4 = st.selectbox("Slot 4 Aliado", df['Nombre'], index=44, key="j4")

with c3:
    st.subheader("👹 Tríada Enemiga")
    e1 = st.selectbox("Enemigo 1", df['Nombre'], index=24, key="e1")
    e2 = st.selectbox("Enemigo 2", df['Nombre'], index=28, key="e2")
    e3 = st.selectbox("Enemigo 3", df['Nombre'], index=26, key="e3")

    st.subheader("👥 Joiners Enemigos")
    ej1 = st.selectbox("Slot 1 Enemigo", df['Nombre'], index=30, key="ej1")
    ej2 = st.selectbox("Slot 2 Enemigo", df['Nombre'], index=29, key="ej2")
    ej3 = st.selectbox("Slot 3 Enemigo", df['Nombre'], index=24, key="ej3")
    ej4 = st.selectbox("Slot 4 Enemigo", df['Nombre'], index=41, key="ej4")

st.divider()
st.header("🪖 Volumen, Ratio y Nivel de Tropas (Cristales de Fuego)")

opciones_fc = ["T10", "FC1", "FC2", "FC3", "FC4", "FC5", "FC6", "FC7", "FC8", "FC9", "FC10"]

col_v1, col_v2 = st.columns(2)
with col_v1:
    st.markdown("### Fuerza Aliada")
    tropas_lider_aliado = st.number_input("Tropas del Líder Aliado", value=220000, step=10000)
    tropas_joiners_aliados = st.number_input("Tropas de Joiners", value=1480000, step=10000)
    tropas_totales_aliadas = tropas_lider_aliado + tropas_joiners_aliados

    col_fc1, col_fc2 = st.columns(2)
    with col_fc1:
        nivel_fc_aliado = st.selectbox("Nivel FC Aliado", opciones_fc, index=9, key="fc_lvl_a")
    with col_fc2:
        helios_aliado = st.checkbox("¿Tropas Helios? (Aliado)", value=True, key="hel_a")

    st.markdown("**Composición del Líder**")
    lider_inf = st.number_input("% Inf (Líder)", min_value=0, max_value=100, value=0, key="linf")
    lider_lan = st.number_input("% Lan (Líder)", min_value=0, max_value=100, value=50, key="llan")
    lider_tir = st.number_input("% Tir (Líder)", min_value=0, max_value=100, value=50, key="ltir")

    st.markdown("**Composición de Joiners**")
    joiner_inf = st.number_input("% Inf (Joiners)", min_value=0, max_value=100, value=100, key="jinf")
    joiner_lan = st.number_input("% Lan (Joiners)", min_value=0, max_value=100, value=0, key="jlan")
    joiner_tir = st.number_input("% Tir (Joiners)", min_value=0, max_value=100, value=0, key="jtir")

with col_v2:
    st.markdown("### Fuerza Enemiga")
    tropas_totales_enemigas = st.number_input("Total Tropas Enemigas", value=1700000, step=10000)

    col_fc3, col_fc4 = st.columns(2)
    with col_fc3:
        nivel_fc_enemigo = st.selectbox("Nivel FC Enemigo", opciones_fc, index=9, key="fc_lvl_e")
    with col_fc4:
        helios_enemigo = st.checkbox("¿Tropas Helios? (Enemigo)", value=True, key="hel_e")

    st.markdown("**Composición Enemiga (Promedio)**")
    enemigo_inf = st.number_input("% Inf (Enemigo)", min_value=0, max_value=100, value=40, key="e_inf")
    enemigo_lan = st.number_input("% Lan (Enemigo)", min_value=0, max_value=100, value=30, key="e_lan")
    enemigo_tir = st.number_input("% Tir (Enemigo)", min_value=0, max_value=100, value=30, key="e_tir")

# Cálculos de Ratios
peso_lider = tropas_lider_aliado / tropas_totales_aliadas if tropas_totales_aliadas > 0 else 0
peso_joiner = tropas_joiners_aliados / tropas_totales_aliadas if tropas_totales_aliadas > 0 else 0

total_inf_pct = (lider_inf * peso_lider) + (joiner_inf * peso_joiner)
total_lan_pct = (lider_lan * peso_lider) + (joiner_lan * peso_joiner)
total_tir_pct = (lider_tir * peso_lider) + (joiner_tir * peso_joiner)
total_ofensiva_pct = total_lan_pct + total_tir_pct

st.write(
    f"📊 **Composición Final Aliada:** {total_inf_pct:.1f}% Inf | {total_lan_pct:.1f}% Lan | {total_tir_pct:.1f}% Tir")

# --- CALCULO DE STATS BASE MEDIANTE LA TABLA EXTRAÍDA ---
fc_aliado_num = 0 if nivel_fc_aliado == "T10" else int(nivel_fc_aliado.replace("FC", ""))
fc_enemigo_num = 0 if nivel_fc_enemigo == "T10" else int(nivel_fc_enemigo.replace("FC", ""))

base_stats_aliado = calcular_stats_base(fc_aliado_num, helios_aliado, total_inf_pct, total_lan_pct, total_tir_pct)
base_stats_enemigo = calcular_stats_base(fc_enemigo_num, helios_enemigo, enemigo_inf, enemigo_lan, enemigo_tir)

st.divider()

# --- PREPARACIÓN DEL MOTOR ---
aliados_nombres = [cap1, cap2, cap3, j1, j2, j3, j4]
enemigos_nombres = [e1, e2, e3, ej1, ej2, ej3, ej4]

aliados_data = pd.concat([df[df['Nombre'] == n] for n in aliados_nombres])
enemigos_data = pd.concat([df[df['Nombre'] == n] for n in enemigos_nombres])

poder_base_aliado = aliados_data.iloc[:3]['Escala'].sum() * global_multiplier
poder_base_enemigo = enemigos_data.iloc[:3]['Escala'].sum() * global_multiplier

buffs_aliados_atk, buffs_aliados_def, debuffs_a_enemigo = clasificar_modificadores(aliados_data)
buffs_enemigos_atk, buffs_enemigos_def, debuffs_a_aliado = clasificar_modificadores(enemigos_data)

vuln_enemigo_total = sum(debuffs_a_enemigo.values())
vuln_aliado_total = sum(debuffs_a_aliado.values())

st.header("⚔️ Registro de Batalla (39 Ticks)")

dano_total_aliado_acumulado = 0
dano_total_enemigo_acumulado = 0

for turno in range(1, 40):
    with st.expander(f"🔹 Tick Global {turno}", expanded=(turno == 1 or turno == 39)):
        eventos_tacticos = []
        dano_dinamico_aliado, dano_dinamico_enemigo = 0.0, 0.0

        for _, heroe in aliados_data.iterrows():
            if heroe['Turnos_Activacion'] > 0 and (turno % heroe['Turnos_Activacion'] == 0):
                dano_dinamico_aliado += heroe['Buff_Dano_Turno'] / 100.0
                if heroe['Buff_Dano_Turno'] > 0: eventos_tacticos.append(
                    f"🔥 **{heroe['Nombre']} (Al)**: +{heroe['Buff_Dano_Turno']}% Daño.")

        for _, heroe in enemigos_data.iterrows():
            if heroe['Turnos_Activacion'] > 0 and (turno % heroe['Turnos_Activacion'] == 0):
                dano_dinamico_enemigo += heroe['Buff_Dano_Turno'] / 100.0
                if heroe['Buff_Dano_Turno'] > 0: eventos_tacticos.append(
                    f"💥 **{heroe['Nombre']} (En)**: +{heroe['Buff_Dano_Turno']}% Daño.")

        # Ecuación Multiplicativa con Stats Puras Reales
        num_aliado = (base_stats_aliado["Atq"] * (poder_base_aliado + buffs_aliados_atk + dano_dinamico_aliado)) * \
                     base_stats_aliado["Let"]
        den_enemigo = (base_stats_enemigo["Def"] * (1.0 + buffs_enemigos_def + (enemigo_inf / 100.0))) * \
                      base_stats_enemigo["HP"]

        dano_bruto_aliado = (num_aliado / max(den_enemigo, 0.1)) * (tropas_totales_aliadas / 1000) * max(
            (total_ofensiva_pct / 100.0), 0.1)

        num_enemigo = (base_stats_enemigo["Atq"] * (poder_base_enemigo + buffs_enemigos_atk + dano_dinamico_enemigo)) * \
                      base_stats_enemigo["Let"]
        den_aliado = (base_stats_aliado["Def"] * (1.0 + buffs_aliados_def + (total_inf_pct / 100.0))) * \
                     base_stats_aliado["HP"]

        dano_bruto_enemigo = (num_enemigo / max(den_aliado, 0.1)) * (tropas_totales_enemigas / 1000) * max(
            ((enemigo_lan + enemigo_tir) / 100.0), 0.1)

        # Modificadores de Estado
        dano_final_aliado = dano_bruto_aliado * (1.0 + vuln_enemigo_total)
        dano_final_enemigo = dano_bruto_enemigo * (1.0 + vuln_aliado_total)

        # --- PRNG ESTOCÁSTICO (CRISTALES DE FUEGO) ---
        rng = random.random()

        if fc_aliado_num >= 8:
            if rng <= 0.375 and total_inf_pct > 0:
                dano_final_enemigo = max(0, dano_final_enemigo - (36 * (tropas_totales_aliadas / 1000)))
                eventos_tacticos.append("🛡️ **Escudo FC (Aliado)** mitigó el impacto.")
            if rng <= 0.15 and total_lan_pct > 0:
                dano_final_aliado *= 2.0
                eventos_tacticos.append("🗡️ **Lanza FC (Aliado)**: Daño Doble.")
            elif 0.15 < rng <= 0.45 and total_tir_pct > 0:
                dano_final_aliado *= 1.5
                eventos_tacticos.append("💨 **Pólvora FC (Aliado)**: +50% Daño.")

        if fc_enemigo_num >= 8:
            if rng <= 0.375 and enemigo_inf > 0:
                dano_final_aliado = max(0, dano_final_aliado - (36 * (tropas_totales_enemigas / 1000)))
            if rng <= 0.15 and enemigo_lan > 0:
                dano_final_enemigo *= 2.0
            elif 0.15 < rng <= 0.45 and enemigo_tir > 0:
                dano_final_enemigo *= 1.5

        dano_total_aliado_acumulado += dano_final_aliado
        dano_total_enemigo_acumulado += dano_final_enemigo

        col_t1, col_t2 = st.columns(2)
        with col_t1:
            st.write(f"🟢 **Tus Tropas Causaron:** {dano_final_aliado:,.0f} impactos")
            st.write(f"🔴 **El Enemigo Causó:** {dano_final_enemigo:,.0f} impactos")
        with col_t2:
            if eventos_tacticos:
                for evento in eventos_tacticos: st.markdown(evento)
            else:
                st.write("⚔️ *Ataques base.*")

st.divider()
st.subheader("🏆 Veredicto de la Simulación (39 Ticks)")
col_r1, col_r2 = st.columns(2)
col_r1.metric("Volumen Bruto Causado (Aliados)", f"{dano_total_aliado_acumulado:,.0f} pts")
col_r2.metric("Volumen Bruto Recibido (Enemigos)", f"{dano_total_enemigo_acumulado:,.0f} pts")

if dano_total_aliado_acumulado > dano_total_enemigo_acumulado:
    st.success("🎉 **VICTORIA:** La matriz de daño perforó la armadura enemiga.")
else:
    st.error("💀 **DERROTA:** El fuego o mitigación enemiga superó a tus Joiners.")

    # --- FIRMA DEL DESARROLLADOR ---
    st.divider()
    st.markdown("""
        <div style='text-align: center; color: gray;'>
            <h4>Desarrollado y diseñado estratégicamente por: <strong>Batman! 🦇</strong></h4>
            <p>Estado: 1518 | ID: 225137388</p>
        </div>
    """, unsafe_allow_html=True)