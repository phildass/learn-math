// Module content data with lessons and fun facts
const moduleData = {
    1: {
        title: "Number Systems & Operations",
        lessons: [
            {
                title: "Natural Numbers and Integers",
                content: "Natural numbers are counting numbers starting from 1, 2, 3, and so on. Integers include all natural numbers, their negatives, and zero.",
                example: {
                    problem: "Express the following in integer form: 5 degrees below zero",
                    solution: "5 degrees below zero = -5°C"
                }
            },
            {
                title: "Rational and Irrational Numbers",
                content: "Rational numbers can be expressed as a fraction p/q where q ≠ 0. Irrational numbers cannot be expressed as fractions and have non-repeating, non-terminating decimals.",
                example: {
                    problem: "Is √2 rational or irrational?",
                    solution: "√2 is irrational because it cannot be expressed as a fraction and equals approximately 1.414213..."
                }
            }
        ],
        funFact: "The number zero was invented in India around 5th century CE by mathematician Aryabhata. Before this, there was no symbol for 'nothing'!"
    },
    2: {
        title: "Algebra Fundamentals",
        lessons: [
            {
                title: "Variables and Expressions",
                content: "Variables are symbols (usually letters) that represent unknown values. Algebraic expressions combine variables and constants using mathematical operations.",
                example: {
                    problem: "Simplify: 3x + 5x - 2x",
                    solution: "3x + 5x - 2x = (3 + 5 - 2)x = 6x"
                }
            },
            {
                title: "Linear Equations",
                content: "A linear equation is an equation where the highest power of the variable is 1. The general form is ax + b = c.",
                example: {
                    problem: "Solve: 2x + 5 = 15",
                    solution: "2x = 15 - 5\n2x = 10\nx = 5"
                }
            }
        ],
        funFact: "The word 'algebra' comes from the Arabic word 'al-jabr' meaning 'reunion of broken parts', coined by Persian mathematician Al-Khwarizmi in the 9th century!"
    },
    3: {
        title: "Geometry Basics",
        lessons: [
            {
                title: "Angles and Their Types",
                content: "Angles are formed when two rays meet at a point. Types include acute (< 90°), right (90°), obtuse (> 90° and < 180°), and straight (180°).",
                example: {
                    problem: "If two angles are complementary and one angle is 35°, find the other angle.",
                    solution: "Complementary angles sum to 90°\nOther angle = 90° - 35° = 55°"
                }
            },
            {
                title: "Triangles and Their Properties",
                content: "A triangle is a polygon with three sides. The sum of interior angles is always 180°. Types include equilateral, isosceles, and scalene.",
                example: {
                    problem: "In a triangle, two angles are 45° and 65°. Find the third angle.",
                    solution: "Sum of angles = 180°\nThird angle = 180° - 45° - 65° = 70°"
                }
            }
        ],
        funFact: "The Great Pyramid of Giza in Egypt has a base perimeter of 920 meters and demonstrates perfect geometrical proportions calculated over 4,500 years ago!"
    },
    4: {
        title: "Trigonometry",
        lessons: [
            {
                title: "Trigonometric Ratios",
                content: "In a right triangle, sine = opposite/hypotenuse, cosine = adjacent/hypotenuse, and tangent = opposite/adjacent.",
                example: {
                    problem: "In a right triangle, if opposite = 3 and hypotenuse = 5, find sin θ",
                    solution: "sin θ = opposite/hypotenuse = 3/5 = 0.6"
                }
            },
            {
                title: "Trigonometric Identities",
                content: "Fundamental identities include sin²θ + cos²θ = 1, and tan θ = sin θ / cos θ.",
                example: {
                    problem: "If sin θ = 0.6, find cos θ (in first quadrant)",
                    solution: "sin²θ + cos²θ = 1\n(0.6)² + cos²θ = 1\ncos²θ = 1 - 0.36 = 0.64\ncos θ = 0.8"
                }
            }
        ],
        funFact: "Ancient Greek astronomer Hipparchus created the first trigonometric table around 150 BCE to predict the positions of stars and planets!"
    },
    5: {
        title: "Calculus Introduction",
        lessons: [
            {
                title: "Limits and Continuity",
                content: "A limit describes the value a function approaches as the input approaches a certain point. Continuity means a function has no breaks or jumps.",
                example: {
                    problem: "Find: lim(x→2) (x² - 4)/(x - 2)",
                    solution: "Factor: (x - 2)(x + 2)/(x - 2) = x + 2\nAs x→2: 2 + 2 = 4"
                }
            },
            {
                title: "Derivatives",
                content: "The derivative represents the rate of change of a function. For f(x) = xⁿ, f'(x) = nxⁿ⁻¹.",
                example: {
                    problem: "Find the derivative of f(x) = x³",
                    solution: "f'(x) = 3x³⁻¹ = 3x²"
                }
            }
        ],
        funFact: "Calculus was independently invented by Isaac Newton in England and Gottfried Leibniz in Germany in the 17th century, leading to a famous dispute over who invented it first!"
    },
    6: {
        title: "Probability & Statistics",
        lessons: [
            {
                title: "Basic Probability",
                content: "Probability measures the likelihood of an event occurring. It ranges from 0 (impossible) to 1 (certain). P(event) = favorable outcomes / total outcomes.",
                example: {
                    problem: "What's the probability of rolling a 4 on a fair die?",
                    solution: "Favorable outcomes = 1 (only one 4)\nTotal outcomes = 6\nP(4) = 1/6 ≈ 0.167"
                }
            },
            {
                title: "Mean, Median, and Mode",
                content: "Mean is the average, median is the middle value, and mode is the most frequent value in a dataset.",
                example: {
                    problem: "Find the mean of: 5, 8, 10, 12, 15",
                    solution: "Mean = (5 + 8 + 10 + 12 + 15) / 5 = 50 / 5 = 10"
                }
            }
        ],
        funFact: "The birthday paradox states that in a group of just 23 people, there's a 50% chance two people share the same birthday - much higher than most people expect!"
    },
    7: {
        title: "Linear Algebra",
        lessons: [
            {
                title: "Matrices and Vectors",
                content: "A matrix is a rectangular array of numbers. Vectors are special matrices with one row or column. They're fundamental in describing linear transformations.",
                example: {
                    problem: "Add matrices: A = [1 2; 3 4] and B = [5 6; 7 8]",
                    solution: "A + B = [1+5 2+6; 3+7 4+8] = [6 8; 10 12]"
                }
            },
            {
                title: "Matrix Multiplication",
                content: "Matrix multiplication is row-by-column. The element at position (i,j) is the dot product of row i from the first matrix and column j from the second.",
                example: {
                    problem: "Multiply: [1 2] × [3; 4]",
                    solution: "[1 2] × [3; 4] = 1×3 + 2×4 = 3 + 8 = 11"
                }
            }
        ],
        funFact: "Google's PageRank algorithm, which revolutionized web search, is based on linear algebra concepts involving massive matrices representing the entire web!"
    },
    8: {
        title: "Advanced Calculus",
        lessons: [
            {
                title: "Multivariable Functions",
                content: "Functions with multiple input variables, like f(x,y) = x² + y². Partial derivatives measure change with respect to one variable while keeping others constant.",
                example: {
                    problem: "Find ∂f/∂x for f(x,y) = x²y + 3x",
                    solution: "Treat y as constant:\n∂f/∂x = 2xy + 3"
                }
            },
            {
                title: "Double Integrals",
                content: "Double integrals extend integration to two dimensions, useful for calculating volumes and areas of complex shapes.",
                example: {
                    problem: "Set up: ∫∫(x + y)dA over rectangle [0,1]×[0,2]",
                    solution: "∫₀¹∫₀²(x + y)dy dx"
                }
            }
        ],
        funFact: "NASA uses multivariable calculus to calculate spacecraft trajectories. The path to Mars requires solving equations with dozens of variables!"
    },
    9: {
        title: "Differential Equations",
        lessons: [
            {
                title: "First-Order Differential Equations",
                content: "Equations involving derivatives of a function. Used to model rates of change in physics, biology, and economics.",
                example: {
                    problem: "Solve: dy/dx = 2x",
                    solution: "Integrate both sides:\ny = ∫2x dx = x² + C"
                }
            },
            {
                title: "Applications of Differential Equations",
                content: "Differential equations model population growth, radioactive decay, cooling of objects, and oscillating systems.",
                example: {
                    problem: "Population growth: dP/dt = 0.05P, P(0) = 1000",
                    solution: "Solution: P(t) = 1000e^(0.05t)\nPopulation grows exponentially at 5% rate"
                }
            }
        ],
        funFact: "The spread of diseases like COVID-19 is modeled using differential equations called SIR models (Susceptible-Infected-Recovered), helping predict pandemic spread!"
    },
    10: {
        title: "Number Theory",
        lessons: [
            {
                title: "Prime Numbers",
                content: "Prime numbers are natural numbers greater than 1 that have no positive divisors other than 1 and themselves. Examples: 2, 3, 5, 7, 11...",
                example: {
                    problem: "Is 17 prime?",
                    solution: "Check divisibility by primes < √17 (≈4.12)\nTest 2, 3: 17 is not divisible by either\nTherefore, 17 is prime"
                }
            },
            {
                title: "Greatest Common Divisor",
                content: "The GCD of two numbers is the largest positive integer that divides both numbers. Euclid's algorithm efficiently finds the GCD.",
                example: {
                    problem: "Find GCD(48, 18)",
                    solution: "48 = 18 × 2 + 12\n18 = 12 × 1 + 6\n12 = 6 × 2 + 0\nGCD = 6"
                }
            }
        ],
        funFact: "The largest known prime number (as of 2023) has over 24 million digits! It would take months to write out completely and is discovered using special computer programs."
    }
};

// Test questions for each module
const testQuestions = {
    1: [
        {
            question: "Which of the following is NOT an integer?",
            options: ["-5", "0", "3.5", "7"],
            correct: 2
        },
        {
            question: "What is √16?",
            options: ["2", "4", "8", "16"],
            correct: 1
        },
        {
            question: "Which number is irrational?",
            options: ["0.5", "1/3", "√3", "0.333..."],
            correct: 2
        },
        {
            question: "What is the additive inverse of 8?",
            options: ["-8", "8", "1/8", "0"],
            correct: 0
        },
        {
            question: "Which set contains only natural numbers?",
            options: ["0, 1, 2, 3", "1, 2, 3, 4", "-1, 0, 1", "0.5, 1.5, 2.5"],
            correct: 1
        },
        {
            question: "What is 2³?",
            options: ["6", "8", "9", "12"],
            correct: 1
        },
        {
            question: "Which is a rational number?",
            options: ["π", "√2", "0.75", "e"],
            correct: 2
        },
        {
            question: "What is the absolute value of -15?",
            options: ["-15", "15", "0", "1/15"],
            correct: 1
        },
        {
            question: "Which operation is performed first: 2 + 3 × 4?",
            options: ["Addition", "Multiplication", "Both simultaneously", "Left to right"],
            correct: 1
        },
        {
            question: "What is 5²?",
            options: ["10", "15", "25", "50"],
            correct: 2
        }
    ],
    2: [
        {
            question: "Simplify: 5x + 3x",
            options: ["8x", "15x", "8x²", "5x + 3"],
            correct: 0
        },
        {
            question: "Solve: x + 7 = 12",
            options: ["x = 19", "x = 5", "x = 7", "x = 84"],
            correct: 1
        },
        {
            question: "What is the coefficient of x in 7x + 3?",
            options: ["3", "7", "10", "x"],
            correct: 1
        },
        {
            question: "Expand: 3(x + 2)",
            options: ["3x + 2", "3x + 6", "x + 6", "3x + 5"],
            correct: 1
        },
        {
            question: "Solve: 2x = 10",
            options: ["x = 5", "x = 20", "x = 2", "x = 12"],
            correct: 0
        },
        {
            question: "If x = 3, what is 2x + 5?",
            options: ["8", "10", "11", "16"],
            correct: 2
        },
        {
            question: "Factorize: x² - 9",
            options: ["(x - 3)(x - 3)", "(x + 3)(x + 3)", "(x - 3)(x + 3)", "x(x - 9)"],
            correct: 2
        },
        {
            question: "Solve: x/2 = 6",
            options: ["x = 3", "x = 8", "x = 12", "x = 4"],
            correct: 2
        },
        {
            question: "What is the degree of polynomial 3x² + 2x + 1?",
            options: ["1", "2", "3", "6"],
            correct: 1
        },
        {
            question: "Simplify: (x + 2) - (x - 3)",
            options: ["5", "2x - 1", "5x", "-1"],
            correct: 0
        }
    ],
    3: [
        {
            question: "What is the sum of angles in a triangle?",
            options: ["90°", "180°", "270°", "360°"],
            correct: 1
        },
        {
            question: "An angle of 45° is called:",
            options: ["Acute", "Right", "Obtuse", "Straight"],
            correct: 0
        },
        {
            question: "How many sides does a hexagon have?",
            options: ["5", "6", "7", "8"],
            correct: 1
        },
        {
            question: "If two angles are supplementary and one is 110°, what is the other?",
            options: ["70°", "80°", "90°", "110°"],
            correct: 0
        },
        {
            question: "What is the area of a rectangle with length 5 and width 3?",
            options: ["8", "15", "16", "30"],
            correct: 1
        },
        {
            question: "A right angle measures:",
            options: ["45°", "90°", "180°", "360°"],
            correct: 1
        },
        {
            question: "The perimeter of a square with side 4 is:",
            options: ["8", "12", "16", "20"],
            correct: 2
        },
        {
            question: "In a right triangle, the longest side is called:",
            options: ["Base", "Height", "Hypotenuse", "Perpendicular"],
            correct: 2
        },
        {
            question: "What is the area of a circle with radius 2? (Use π ≈ 3.14)",
            options: ["6.28", "12.56", "25.12", "50.24"],
            correct: 1
        },
        {
            question: "How many degrees in a full rotation?",
            options: ["90°", "180°", "270°", "360°"],
            correct: 3
        }
    ],
    4: [
        {
            question: "In a right triangle, sin θ is equal to:",
            options: ["Adjacent/Hypotenuse", "Opposite/Hypotenuse", "Opposite/Adjacent", "Hypotenuse/Opposite"],
            correct: 1
        },
        {
            question: "What is sin 30°?",
            options: ["0.5", "0.707", "0.866", "1"],
            correct: 0
        },
        {
            question: "What is cos 0°?",
            options: ["0", "0.5", "0.707", "1"],
            correct: 3
        },
        {
            question: "tan θ equals:",
            options: ["sin θ × cos θ", "sin θ / cos θ", "cos θ / sin θ", "1 / sin θ"],
            correct: 1
        },
        {
            question: "What is the value of sin² θ + cos² θ?",
            options: ["0", "1", "2", "θ"],
            correct: 1
        },
        {
            question: "If cos θ = 0, then θ could be:",
            options: ["0°", "30°", "90°", "180°"],
            correct: 2
        },
        {
            question: "What is sin 90°?",
            options: ["0", "0.5", "0.707", "1"],
            correct: 3
        },
        {
            question: "Which trigonometric ratio uses opposite and adjacent sides?",
            options: ["sine", "cosine", "tangent", "cosecant"],
            correct: 2
        },
        {
            question: "If sin θ = 1, what is θ?",
            options: ["0°", "30°", "45°", "90°"],
            correct: 3
        },
        {
            question: "What is cos 60°?",
            options: ["0.5", "0.707", "0.866", "1"],
            correct: 0
        }
    ],
    5: [
        {
            question: "The derivative of x² is:",
            options: ["x", "2x", "x²", "2"],
            correct: 1
        },
        {
            question: "What is lim(x→0) (sin x / x)?",
            options: ["0", "1", "∞", "undefined"],
            correct: 1
        },
        {
            question: "The derivative of a constant is:",
            options: ["0", "1", "The constant itself", "x"],
            correct: 0
        },
        {
            question: "What is the integral of 2x?",
            options: ["2", "x²", "x² + C", "2x²"],
            correct: 2
        },
        {
            question: "If f(x) = x³, what is f'(x)?",
            options: ["x²", "3x", "3x²", "x³/3"],
            correct: 2
        },
        {
            question: "The derivative of sin x is:",
            options: ["cos x", "-cos x", "sin x", "-sin x"],
            correct: 0
        },
        {
            question: "What does dy/dx represent?",
            options: ["Area under curve", "Rate of change", "Sum of values", "Average value"],
            correct: 1
        },
        {
            question: "The power rule states that d/dx(xⁿ) equals:",
            options: ["nxⁿ", "xⁿ⁻¹", "nxⁿ⁻¹", "n"],
            correct: 2
        },
        {
            question: "What is ∫1 dx?",
            options: ["0", "1", "x", "x + C"],
            correct: 3
        },
        {
            question: "A function is continuous if:",
            options: ["It has no breaks", "It's differentiable", "It's linear", "It equals zero"],
            correct: 0
        }
    ],
    6: [
        {
            question: "The probability of an impossible event is:",
            options: ["0", "0.5", "1", "undefined"],
            correct: 0
        },
        {
            question: "What is the probability of getting heads when flipping a fair coin?",
            options: ["0.25", "0.5", "0.75", "1"],
            correct: 1
        },
        {
            question: "The mean of 2, 4, 6, 8, 10 is:",
            options: ["5", "6", "7", "8"],
            correct: 1
        },
        {
            question: "The median of 1, 3, 5, 7, 9 is:",
            options: ["3", "5", "6", "7"],
            correct: 1
        },
        {
            question: "The mode of 2, 3, 3, 4, 5 is:",
            options: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "In a deck of 52 cards, probability of drawing an ace is:",
            options: ["1/13", "1/26", "1/52", "4/52"],
            correct: 0
        },
        {
            question: "The probability of a certain event is:",
            options: ["0", "0.5", "1", "2"],
            correct: 2
        },
        {
            question: "Standard deviation measures:",
            options: ["Average", "Middle value", "Spread of data", "Most frequent value"],
            correct: 2
        },
        {
            question: "What is the range of 5, 10, 15, 20?",
            options: ["5", "10", "15", "20"],
            correct: 2
        },
        {
            question: "If you roll a die, probability of getting a number less than 5 is:",
            options: ["2/3", "3/6", "4/6", "5/6"],
            correct: 2
        }
    ],
    7: [
        {
            question: "A 2×3 matrix has:",
            options: ["2 rows, 3 columns", "3 rows, 2 columns", "5 elements", "6 rows"],
            correct: 0
        },
        {
            question: "The identity matrix has:",
            options: ["All zeros", "All ones", "Ones on diagonal, zeros elsewhere", "Random numbers"],
            correct: 2
        },
        {
            question: "Matrix addition requires matrices to be:",
            options: ["Square", "Same size", "Invertible", "Symmetric"],
            correct: 1
        },
        {
            question: "What is [1 2] + [3 4]?",
            options: ["[3 6]", "[4 6]", "[1 2 3 4]", "[4 8]"],
            correct: 1
        },
        {
            question: "A vector has:",
            options: ["Magnitude only", "Direction only", "Both magnitude and direction", "Neither"],
            correct: 2
        },
        {
            question: "The transpose of a 3×2 matrix is:",
            options: ["3×2", "2×3", "6×1", "1×6"],
            correct: 1
        },
        {
            question: "The determinant of a 2×2 matrix [a b; c d] is:",
            options: ["a + d", "ad - bc", "ac - bd", "ab - cd"],
            correct: 1
        },
        {
            question: "Two matrices can be multiplied if:",
            options: ["They're the same size", "They're square", "Columns of first = rows of second", "They're invertible"],
            correct: 2
        },
        {
            question: "A zero matrix has:",
            options: ["All elements = 0", "All elements = 1", "Determinant = 0", "No elements"],
            correct: 0
        },
        {
            question: "The dot product of [1, 2] and [3, 4] is:",
            options: ["7", "11", "14", "[3, 8]"],
            correct: 1
        }
    ],
    8: [
        {
            question: "A function f(x, y) has how many independent variables?",
            options: ["1", "2", "3", "infinite"],
            correct: 1
        },
        {
            question: "∂f/∂x means:",
            options: ["Full derivative", "Partial derivative with respect to x", "Integral of x", "Second derivative"],
            correct: 1
        },
        {
            question: "For f(x,y) = x² + y², what is ∂f/∂x?",
            options: ["2x", "2y", "2x + 2y", "x² + y²"],
            correct: 0
        },
        {
            question: "A double integral represents:",
            options: ["Length", "Area or volume", "Slope", "Rate of change"],
            correct: 1
        },
        {
            question: "∇f represents:",
            options: ["Integral", "Derivative", "Gradient", "Limit"],
            correct: 2
        },
        {
            question: "For f(x,y) = xy, what is ∂f/∂y?",
            options: ["x", "y", "xy", "0"],
            correct: 0
        },
        {
            question: "A level curve shows points where f(x,y) equals:",
            options: ["Zero", "Maximum", "A constant", "x + y"],
            correct: 2
        },
        {
            question: "The chain rule in multivariable calculus involves:",
            options: ["One derivative", "Two derivatives", "Partial derivatives", "No derivatives"],
            correct: 2
        },
        {
            question: "∫∫dA represents integration over:",
            options: ["A line", "An area", "A point", "Time"],
            correct: 1
        },
        {
            question: "Critical points occur where:",
            options: ["f = 0", "All partial derivatives = 0", "f is maximum", "x = y"],
            correct: 1
        }
    ],
    9: [
        {
            question: "A differential equation contains:",
            options: ["Only functions", "Only derivatives", "Derivatives and functions", "Only constants"],
            correct: 2
        },
        {
            question: "dy/dx = y is a:",
            options: ["Algebraic equation", "First-order differential equation", "Second-order differential equation", "Quadratic equation"],
            correct: 1
        },
        {
            question: "The general solution of dy/dx = 0 is:",
            options: ["y = 0", "y = x", "y = C", "y = x + C"],
            correct: 2
        },
        {
            question: "The order of d²y/dx² + dy/dx = 0 is:",
            options: ["0", "1", "2", "3"],
            correct: 2
        },
        {
            question: "Separation of variables works when:",
            options: ["Variables can be separated", "Equation is linear", "Equation is quadratic", "Always"],
            correct: 0
        },
        {
            question: "The solution to dy/dx = 2x is:",
            options: ["y = 2x", "y = x²", "y = x² + C", "y = 2"],
            correct: 2
        },
        {
            question: "An initial value problem requires:",
            options: ["Only the equation", "An initial condition", "Two equations", "A boundary"],
            correct: 1
        },
        {
            question: "Population growth is often modeled with:",
            options: ["Linear equations", "Quadratic equations", "Exponential equations", "Cubic equations"],
            correct: 2
        },
        {
            question: "A homogeneous differential equation has:",
            options: ["No constant term", "All terms with y or its derivatives", "Degree 1", "Two solutions"],
            correct: 1
        },
        {
            question: "The degree of dy/dx + y = 0 is:",
            options: ["0", "1", "2", "undefined"],
            correct: 1
        }
    ],
    10: [
        {
            question: "Which is the smallest prime number?",
            options: ["0", "1", "2", "3"],
            correct: 2
        },
        {
            question: "How many prime numbers are even?",
            options: ["0", "1", "2", "infinite"],
            correct: 1
        },
        {
            question: "The GCD of 12 and 18 is:",
            options: ["2", "3", "6", "36"],
            correct: 2
        },
        {
            question: "A composite number has:",
            options: ["No factors", "Only 1 and itself as factors", "More than two factors", "Exactly two factors"],
            correct: 2
        },
        {
            question: "Which is NOT prime?",
            options: ["17", "19", "21", "23"],
            correct: 2
        },
        {
            question: "The LCM of 4 and 6 is:",
            options: ["2", "12", "24", "4"],
            correct: 1
        },
        {
            question: "A perfect number equals:",
            options: ["Sum of its divisors", "Sum of its proper divisors", "Product of its divisors", "Square of a prime"],
            correct: 1
        },
        {
            question: "The first perfect number is:",
            options: ["1", "6", "12", "28"],
            correct: 1
        },
        {
            question: "Two numbers are coprime if their GCD is:",
            options: ["0", "1", "2", "Equal to the smaller number"],
            correct: 1
        },
        {
            question: "Fermat's Little Theorem involves:",
            options: ["Triangles", "Prime numbers", "Circles", "Squares"],
            correct: 1
        }
    ]
};

let currentModule = null;
let currentQuestion = 0;
let score = 0;
let answers = [];
let testStartTime = null;

// Show module content
function showModule(moduleNum) {
    currentModule = moduleNum;
    const data = moduleData[moduleNum];
    const modal = document.getElementById('moduleModal');
    const contentArea = document.getElementById('moduleContentArea');
    
    let lessonsHTML = '';
    data.lessons.forEach((lesson, index) => {
        lessonsHTML += `
            <div class="lesson">
                <h3>Lesson ${index + 1}: ${lesson.title}</h3>
                <p>${lesson.content}</p>
                <div class="example">
                    <h4>Example:</h4>
                    <p><strong>Problem:</strong> ${lesson.example.problem}</p>
                    <p><strong>Solution:</strong></p>
                    <pre>${lesson.example.solution}</pre>
                </div>
            </div>
        `;
    });
    
    contentArea.innerHTML = `
        <div class="module-content">
            <h2>${data.title}</h2>
            ${lessonsHTML}
            <div class="fun-fact">
                <h4>🌍 Interesting Fact from Around the World:</h4>
                <p>${data.funFact}</p>
            </div>
            <div style="text-align: center;">
                <button class="start-test-btn" onclick="startTest(${moduleNum})">Take Module Test</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close module modal
function closeModule() {
    document.getElementById('moduleModal').style.display = 'none';
}

// Start test
function startTest(moduleNum) {
    // Check if user is authenticated before allowing test
    checkAuthenticationForTest().then(isAuthenticated => {
        if (!isAuthenticated) {
            // Redirect to iiskills.cloud for authentication
            if (confirm('You must be authenticated to take tests. You will be redirected to iiskills.cloud to sign in or register. Continue?')) {
                window.location.href = IIS_SKILLS_CLOUD_AUTH_URL;
            }
            return;
        }
        
        closeModule();
        currentModule = moduleNum;
        currentQuestion = 0;
        score = 0;
        answers = [];
        testStartTime = new Date();
        
        const modal = document.getElementById('testModal');
        modal.style.display = 'block';
        
        showQuestion();
    });
}

// Show question
function showQuestion() {
    const questions = testQuestions[currentModule];
    const contentArea = document.getElementById('testContentArea');
    const progress = ((currentQuestion) / questions.length) * 100;
    
    const question = questions[currentQuestion];
    
    let optionsHTML = '';
    question.options.forEach((option, index) => {
        optionsHTML += `
            <div class="option" onclick="selectAnswer(${index})">${option}</div>
        `;
    });
    
    contentArea.innerHTML = `
        <div class="test-container">
            <div class="test-header">
                <h2>Module ${currentModule} Test</h2>
                <p>Question ${currentQuestion + 1} of ${questions.length}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
            <div class="question-container">
                <div class="question">${question.question}</div>
                <div class="options">
                    ${optionsHTML}
                </div>
            </div>
        </div>
    `;
}

// Select answer and move to next question
function selectAnswer(selectedIndex) {
    const questions = testQuestions[currentModule];
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Record answer
    answers.push({
        question: currentQuestion,
        selected: selectedIndex,
        correct: question.correct
    });
    
    // Check if correct
    if (selectedIndex === question.correct) {
        score++;
        options[selectedIndex].classList.add('correct');
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }
    
    // Disable all options
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Move to next question after a short delay
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 800);
}

// Show test results
function showResults() {
    const contentArea = document.getElementById('testContentArea');
    const totalQuestions = testQuestions[currentModule].length;
    const percentage = (score / totalQuestions) * 100;
    
    let message = '';
    if (percentage >= 90) {
        message = 'Excellent! You have mastered this module! 🌟';
    } else if (percentage >= 70) {
        message = 'Great job! You have a good understanding! 👏';
    } else if (percentage >= 50) {
        message = 'Good effort! Review the lessons and try again. 📚';
    } else {
        message = 'Keep practicing! Review the module and retake the test. 💪';
    }
    
    // Calculate time taken
    const timeTaken = testStartTime ? Math.round((new Date() - testStartTime) / 1000 / 60) + ' minutes' : 'N/A';
    
    // Save test result
    saveTestResult(currentModule, score, totalQuestions, timeTaken);
    
    contentArea.innerHTML = `
        <div class="test-result">
            <h2>Test Complete!</h2>
            <div class="score">${score} / ${totalQuestions}</div>
            <div class="result-message">${message}</div>
            <p>You scored ${percentage.toFixed(0)}%</p>
            <p>Time taken: ${timeTaken}</p>
            <button class="start-test-btn" onclick="startTest(${currentModule})">Retake Test</button>
            <button class="back-btn" onclick="closeTest()">Back to Modules</button>
        </div>
    `;
}

// Close test modal
function closeTest() {
    document.getElementById('testModal').style.display = 'none';
    currentModule = null;
    currentQuestion = 0;
    score = 0;
    answers = [];
}

// Close modals when clicking outside
window.onclick = function(event) {
    const moduleModal = document.getElementById('moduleModal');
    const testModal = document.getElementById('testModal');
    
    if (event.target === moduleModal) {
        closeModule();
    }
    if (event.target === testModal) {
        closeTest();
    }
}

// Authentication functions
// NOTE: Local authentication has been disabled
// All authentication handled centrally through iiskills.cloud
const IIS_SKILLS_CLOUD_AUTH_URL = 'https://iiskills.cloud/register';

async function checkAuthentication() {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        
        const userNameEl = document.getElementById('userName');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        
        if (data.authenticated) {
            // User is authenticated
            if (userNameEl) {
                userNameEl.textContent = `Welcome, ${data.user.name}!`;
            }
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            return true;
        } else {
            // Not authenticated - redirect to iiskills.cloud
            if (userNameEl) {
                userNameEl.textContent = 'Not Authenticated';
            }
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (loginBtn) {
                loginBtn.style.display = 'inline-block';
                // Update login button to redirect to iiskills.cloud
                loginBtn.removeEventListener('click', loginBtn._iisRedirectHandler);
                loginBtn._iisRedirectHandler = () => {
                    window.location.href = IIS_SKILLS_CLOUD_AUTH_URL;
                };
                loginBtn.addEventListener('click', loginBtn._iisRedirectHandler);
            }
            if (signupBtn) {
                signupBtn.style.display = 'inline-block';
                // Update signup button to redirect to iiskills.cloud
                signupBtn.removeEventListener('click', signupBtn._iisRedirectHandler);
                signupBtn._iisRedirectHandler = () => {
                    window.location.href = IIS_SKILLS_CLOUD_AUTH_URL;
                };
                signupBtn.addEventListener('click', signupBtn._iisRedirectHandler);
            }
            
            // Show authentication message
            showAuthenticationMessage();
            return false;
        }
    } catch (error) {
        console.error('Authentication check error:', error);
        return false;
    }
}

function showAuthenticationMessage() {
    // Create and display a message prompting user to authenticate via iiskills.cloud
    const existingMessage = document.getElementById('auth-message-banner');
    if (existingMessage) return; // Already showing
    
    const banner = document.createElement('div');
    banner.id = 'auth-message-banner';
    banner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        text-align: center;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    banner.innerHTML = `
        <strong>🔐 Authentication Required</strong>
        <p style="margin: 5px 0;">
            To access protected content, please sign in through iiskills.cloud.
            <a href="${IIS_SKILLS_CLOUD_AUTH_URL}" 
               style="color: #fff; text-decoration: underline; font-weight: 600; margin-left: 10px;">
                Sign In / Register Here
            </a>
        </p>
    `;
    
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Adjust body padding to account for banner
    document.body.style.paddingTop = '80px';
}

async function checkAuthenticationForTest() {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        return data.authenticated;
    } catch (error) {
        console.error('Authentication check error:', error);
        return false;
    }
}

async function saveTestResult(moduleId, score, totalQuestions, timeTaken) {
    try {
        const moduleName = moduleData[moduleId].title;
        
        const response = await fetch('/api/test-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                moduleId,
                moduleName,
                score,
                totalQuestions,
                timeTaken
            })
        });
        
        const data = await response.json();
        if (!data.success) {
            console.error('Failed to save test result:', data.message);
        }
    } catch (error) {
        console.error('Error saving test result:', error);
    }
}

async function handleLogout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Clear session storage
            sessionStorage.clear();
            
            // Redirect to iiskills.cloud (or show message)
            alert('You have been logged out. Please use iiskills.cloud to sign in again.');
            window.location.href = IIS_SKILLS_CLOUD_AUTH_URL;
        }
    } catch (error) {
        console.error('Logout error:', error);
        // Still redirect to iiskills.cloud on error
        window.location.href = IIS_SKILLS_CLOUD_AUTH_URL;
    }
}

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

