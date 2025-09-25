import { Problem, ProblemType, Proficiency } from '../types';
import { PROBLEM_SETS } from '../constants';

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateOptions(correctAnswer: number, max: number): number[] {
    const options = new Set<number>([correctAnswer]);
    while (options.size < 4) {
        // Ensure generated options are reasonably close to the answer
        const range = Math.max(10, correctAnswer * 0.5);
        const minOption = Math.max(1, correctAnswer - range);
        const maxOption = correctAnswer + range;
        const randomOption = Math.floor(Math.random() * (maxOption - minOption + 1)) + minOption;

        if (randomOption !== correctAnswer) {
            options.add(randomOption);
        }
    }
    return shuffleArray(Array.from(options));
}

export function generateProblem(proficiency: Proficiency, mode: ProblemType): Problem {
    if (mode === ProblemType.ADDITION) {
        const [min, max] = PROBLEM_SETS.addition.range;
        const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        const answer = num1 + num2;
        return {
            key: `add_${num1}+${num2}`,
            type: ProblemType.ADDITION,
            question: `What is ${num1} + ${num2}?`,
            visual: { groups: num1, itemsPerGroup: num2 },
            options: generateOptions(answer, max + max),
            answer,
        };
    }
    
    if (mode === ProblemType.MULTIPLICATION) {
        const table = PROBLEM_SETS.multiplication.tables[Math.floor(Math.random() * PROBLEM_SETS.multiplication.tables.length)];
        const multiplier = Math.floor(Math.random() * 9) + 2; // 2-10
        const answer = table * multiplier;
        return {
            key: `mult_${table}x${multiplier}`,
            type: ProblemType.MULTIPLICATION,
            question: `What is ${table} x ${multiplier}?`,
            visual: { groups: table, itemsPerGroup: multiplier },
            options: generateOptions(answer, table * 10),
            answer,
        };
    }

    // Default to DIVISION if not multiplication
    const table = PROBLEM_SETS.division.tables[Math.floor(Math.random() * PROBLEM_SETS.division.tables.length)];
    const answer = Math.floor(Math.random() * 9) + 2; // 2-10
    const dividend = table * answer;
    return {
        key: `div_${dividend}÷${table}`,
        type: ProblemType.DIVISION,
        question: `What is ${dividend} ÷ ${table}?`,
        visual: { groups: table, itemsPerGroup: answer },
        options: generateOptions(answer, 10),
        answer,
    };
}