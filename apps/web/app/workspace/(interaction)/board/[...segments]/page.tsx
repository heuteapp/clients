"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Stack, Box, Typography } from "@mui/material";

export default function WorkspaceBoardPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [step, setStep] = useState(0);

    const steps = [
        { path: "/workspace/board", label: "Base Board" },
        { path: "/workspace/board/school", label: "School" },
        { path: "/workspace/board/school/grade2", label: "Grade 2" },
        { path: "/workspace/board/school/grade2/math", label: "Math" },
        { path: "/workspace/board/school/grade2/math/260202", label: "260202" }
    ];

    // URL'den mevcut step'i bul
    useEffect(() => {
        const currentStep = steps.findIndex(step => step.path === pathname);
        if (currentStep !== -1) {
            setStep(currentStep);
        }
    }, [pathname]);

    const handleNext = () => {
        if (step < steps.length - 1) {
            const nextStep = step + 1;
            router.push(steps[nextStep].path);
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            const prevStep = step - 1;
            router.push(steps[prevStep].path);
        }
    };

    const handleReset = () => {
        router.push(steps[0].path);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Workspace Board
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Current Step: {step + 1} / {steps.length}
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 3 }}>
                Current Path: {steps[step].path}
            </Typography>
            
            <Stack direction="row" spacing={2}>
                <Button 
                    variant="contained" 
                    onClick={handlePrev}
                    disabled={step === 0}
                >
                    Previous
                </Button>
                
                <Button 
                    variant="contained" 
                    onClick={handleNext}
                    disabled={step === steps.length - 1}
                >
                    Next
                </Button>
                
                <Button 
                    variant="outlined" 
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </Stack>
            
            <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
                {steps.map((stepItem, index) => (
                    <Button
                        key={index}
                        variant={index === step ? "contained" : "outlined"}
                        size="small"
                        onClick={() => router.push(stepItem.path)}
                    >
                        {index + 1}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
}