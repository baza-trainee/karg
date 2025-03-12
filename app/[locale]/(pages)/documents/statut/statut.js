'use client';
import styles from './statut.module.scss';
import { Box, Heading } from '@chakra-ui/react';

export default function StatutContent({ pdfUrl }) {
    return (
        <Box className={styles.container}>
            <Heading as="h1" textAlign="center" mb={8}>
                Статут
            </Heading>
            <iframe
                src={pdfUrl}
                title="Статут організації"
            />
        </Box>
    );
}