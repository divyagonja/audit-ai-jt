import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a clean font (optional, using standard Helvetica/bold for now for speed)
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 30,
        borderBottom: 1,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '#64748b',
    },
    scoreSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        backgroundColor: '#f8fafc',
        padding: 20,
        borderRadius: 8,
    },
    scoreBox: {
        alignItems: 'center',
    },
    scoreLabel: {
        fontSize: 10,
        color: '#64748b',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    scoreValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2563eb',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0f172a',
        marginTop: 20,
        marginBottom: 10,
        textTransform: 'uppercase',
        borderLeft: 4,
        borderLeftColor: '#2563eb',
        paddingLeft: 8,
    },
    issueCard: {
        marginBottom: 15,
        padding: 15,
        border: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
    },
    issueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    issueTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0f172a',
        width: '80%',
    },
    severityBadge: {
        fontSize: 8,
        padding: '2 6',
        borderRadius: 4,
        textTransform: 'uppercase',
        color: '#ffffff',
    },
    issueDescription: {
        fontSize: 10,
        color: '#475569',
        marginBottom: 8,
        lineHeight: 1.4,
    },
    fixSection: {
        backgroundColor: '#f1f5f9',
        padding: 10,
        borderRadius: 4,
        marginTop: 5,
    },
    fixTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#334155',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    code: {
        fontSize: 8,
        fontFamily: 'Courier',
        color: '#1e293b',
        backgroundColor: '#e2e8f0',
        padding: 8,
        borderRadius: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 8,
        color: '#94a3b8',
        borderTop: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 10,
    }
});

interface AuditReportPDFProps {
    audit: any;
    issues: any[];
}

export const AuditReportPDF = ({ audit, issues }: AuditReportPDFProps) => {
    const date = new Date(audit?.completed_at || Date.now()).toLocaleDateString();

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>AuditAI Technical Report</Text>
                    <Text style={styles.subtitle}>Full Audit Analysis for: {audit?.url}</Text>
                    <Text style={styles.subtitle}>Generated on: {date}</Text>
                </View>

                {/* Global Scores */}
                <View style={styles.scoreSection}>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreLabel}>Health Score</Text>
                        <Text style={styles.scoreValue}>{audit?.overall_score}/100</Text>
                    </View>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreLabel}>SEO</Text>
                        <Text style={styles.scoreValue}>{audit?.seo_score || 0}</Text>
                    </View>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreLabel}>Performance</Text>
                        <Text style={styles.scoreValue}>{audit?.performance_score || 0}</Text>
                    </View>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreLabel}>Security</Text>
                        <Text style={styles.scoreValue}>{audit?.security_score || 0}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Technical Intelligence Feed</Text>

                {issues.map((issue, index) => (
                    <View key={index} style={styles.issueCard} wrap={false}>
                        <View style={styles.issueHeader}>
                            <Text style={styles.issueTitle}>{issue.title}</Text>
                            <View style={[
                                styles.severityBadge,
                                { backgroundColor: issue.severity === 'critical' ? '#e11d48' : issue.severity === 'high' ? '#f59e0b' : '#3b82f6' }
                            ]}>
                                <Text>{issue.severity}</Text>
                            </View>
                        </View>
                        <Text style={styles.issueDescription}>{issue.description}</Text>

                        {issue.fix_code && (
                            <View style={styles.fixSection}>
                                <Text style={styles.fixTitle}>Recommended Implementation Snippet</Text>
                                <Text style={styles.code}>{issue.fix_code}</Text>
                            </View>
                        )}
                    </View>
                ))}

                <Text style={styles.footer}>
                    © {new Date().getFullYear()} AuditAI. Strategic Website Intelligence for High-Growth Brands.
                </Text>
            </Page>
        </Document>
    );
};
