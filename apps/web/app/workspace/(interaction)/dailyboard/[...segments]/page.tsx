"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Stack, Box, Typography, Paper, Divider, Chip } from "@mui/material";

export default function WorkspaceDailyboardPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [step, setStep] = useState(0);

    const steps = [
        { path: "/workspace/dailyboard", label: "Dailyboard", slug: "dailyboard" },
        { path: "/workspace/dailyboard/school", label: "School", slug: "school" },
        { path: "/workspace/dailyboard/school/grade2", label: "Grade 2", slug: "grade2" },
        { path: "/workspace/dailyboard/school/grade2/math", label: "Math", slug: "math" },
        { path: "/workspace/dailyboard/school/grade2/math/students", label: "Students", slug: "students" },
        { path: "/workspace/dailyboard/school/grade2/math/students/alice", label: "Alice", slug: "alice" },
        { path: "/workspace/dailyboard/school/grade2/math/students/alice/exams", label: "Exams", slug: "exams" },
        { path: "/workspace/dailyboard/school/grade2/math/students/alice/exams/midterm", label: "Midterm", slug: "midterm" },
        { path: "/workspace/dailyboard/school/grade2/math/students/alice/exams/midterm/results", label: "Results", slug: "results" },
        { path: "/workspace/dailyboard/school/grade2/math/students/alice/exams/midterm/results/2024", label: "2024", slug: "2024" }
    ];

    useEffect(() => {
        const currentStep = steps.findIndex(step => step.path === pathname);
        if (currentStep !== -1) {
            setStep(currentStep);
        }
    }, [pathname]);

    const handleNext = () => {
        if (step < steps.length - 1) {
            router.push(steps[step + 1].path);
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            router.push(steps[step - 1].path);
        }
    };

    const handleReset = () => {
        router.push(steps[0].path);
    };

    const handleLast = () => {
        router.push(steps[steps.length - 1].path);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Workspace Dailyboard Navigation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Step by step navigation with 10 levels
                </Typography>
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Typography variant="subtitle2" color="text.secondary">
                        Current Progress:
                    </Typography>
                    <Typography variant="h6">
                        {step + 1} / {steps.length}
                    </Typography>
                    <Chip 
                        label={`${Math.round((step + 1) / steps.length * 100)}%`} 
                        color="primary" 
                        size="small"
                    />
                </Stack>
                
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Current Path:
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                        <Typography variant="body2" fontFamily="monospace">
                            {steps[step].path}
                        </Typography>
                    </Paper>
                </Box>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button 
                        variant="contained" 
                        onClick={handlePrev}
                        disabled={step === 0}
                    >
                        ← Previous
                    </Button>
                    
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleNext}
                        disabled={step === steps.length - 1}
                    >
                        Next →
                    </Button>
                    
                    <Button 
                        variant="outlined" 
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    
                    <Button 
                        variant="outlined" 
                        onClick={handleLast}
                        disabled={step === steps.length - 1}
                    >
                        Last
                    </Button>
                </Stack>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Breadcrumb Steps
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {steps.map((stepItem, index) => (
                        <Button
                            key={index}
                            variant={index === step ? "contained" : "outlined"}
                            size="small"
                            onClick={() => router.push(stepItem.path)}
                            sx={{ 
                                mb: 1,
                                opacity: index === step ? 1 : 0.7,
                                '&:hover': { opacity: 1 }
                            }}
                        >
                            {stepItem.label}
                        </Button>
                    ))}
                </Stack>
            </Paper>
        </Box>
    );
}