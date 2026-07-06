#!/usr/bin/env python3
"""
Brainstorm Scoring Matrix
Usage: python3 scoring_matrix.py "Idea Name" feasibility impact cost time

Example:
  python3 scoring_matrix.py "AI Agent Service" 8 9 medium long
"""

import sys

def score_idea(name, feasibility, impact, cost, time):
    weights = {"feasibility": 2, "impact": 3}
    cost_map = {"low": 10, "medium": 5, "high": 0}
    time_map = {"short": 10, "medium": 5, "long": 0}
    
    base_score = (feasibility * weights["feasibility"] + impact * weights["impact"]) / 15 * 10
    cost_penalty = cost_map.get(cost.lower(), 0)
    time_penalty = time_map.get(time.lower(), 0)
    
    final_score = base_score + cost_penalty + time_penalty
    
    return {
        "name": name,
        "feasibility": feasibility,
        "impact": impact,
        "cost": cost,
        "time": time,
        "score": round(final_score, 1),
        "rating": "⭐⭐⭐⭐⭐" if final_score >= 8 else "⭐⭐⭐⭐" if final_score >= 6 else "⭐⭐⭐" if final_score >= 4 else "⭐⭐"
    }

if __name__ == "__main__":
    if len(sys.argv) < 6:
        print(__doc__)
        sys.exit(1)
    
    result = score_idea(sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4], sys.argv[5])
    print(f"\n📊 Scoring Results for: {result['name']}")
    print(f"   Feasibility: {result['feasibility']}/10")
    print(f"   Impact: {result['impact']}/10")
    print(f"   Cost: {result['cost']}")
    print(f"   Time: {result['time']}")
    print(f"   Score: {result['score']}/10 {result['rating']}\n")