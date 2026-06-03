import { useGetList } from "react-admin";
import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import EuroIcon from "@mui/icons-material/Euro";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatCard = ({ title, value, subtitle, color, icon }: any) => (
  <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="caption" color="text.secondary" fontWeight={500} textTransform="uppercase" letterSpacing={1}>
          {title}
        </Typography>
        <Box sx={{ color, opacity: 0.8 }}>{icon}</Box>
      </Box>
      <Typography variant="h3" fontWeight={700} color={color}>
        {value ?? "—"}
      </Typography>
      {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: totalEmployees } = useGetList("employees", { pagination: { page: 1, perPage: 1 } });
  const { total: activeEmployees } = useGetList("employees", { pagination: { page: 1, perPage: 1 }, filter: { active: true } });
  const { total: totalInterns } = useGetList("interns", { pagination: { page: 1, perPage: 1 } });
  const { total: remuneratedInterns } = useGetList("interns", { pagination: { page: 1, perPage: 1 }, filter: { isRemunerate: true } });

  const activePercent = totalEmployees ? Math.round(((activeEmployees ?? 0) / totalEmployees) * 100) : 0;
  const remuPercent = totalInterns ? Math.round(((remuneratedInterns ?? 0) / totalInterns) * 100) : 0;

  const deptData = {
    labels: ["Informatique", "Marketing", "Finance", "RH"],
    datasets: [{
      data: [2, 1, 1, 1],
      backgroundColor: ["#1976d2", "#2e7d32", "#ed6c02", "#9c27b0"],
      borderWidth: 0,
    }],
  };

  const remuData = {
    labels: ["Rémunérés", "Non rémunérés"],
    datasets: [{
      data: [remuneratedInterns ?? 0, (totalInterns ?? 0) - (remuneratedInterns ?? 0)],
      backgroundColor: ["#1976d2", "#e0e0e0"],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" as const } },
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Tableau de bord RH
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Vue d'ensemble des employés et stagiaires
      </Typography>

      {/* 4 cartes stats */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total employés" value={totalEmployees} subtitle="tous départements" color="#1976d2" icon={<PeopleIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Employés actifs" value={activeEmployees} subtitle={`${activePercent}% du total`} color="#2e7d32" icon={<PersonIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total stagiaires" value={totalInterns} subtitle="tous départements" color="#ed6c02" icon={<SchoolIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Stagiaires rémunérés" value={remuneratedInterns} subtitle={`${remuPercent}% du total`} color="#9c27b0" icon={<EuroIcon />} />
        </Grid>
      </Grid>

      {/* 2 graphiques donut */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Employés par département
            </Typography>
            <Box sx={{ height: 250 }}>
              <Doughnut data={deptData} options={chartOptions} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3, p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Rémunération des stagiaires
            </Typography>
            <Box sx={{ height: 250 }}>
              <Doughnut data={remuData} options={chartOptions} />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Badges résumé */}
      <Box display="flex" gap={2} flexWrap="wrap">
        <Chip label={`${activeEmployees ?? 0} employés actifs`} color="success" variant="outlined" />
        <Chip label={`${(totalEmployees ?? 0) - (activeEmployees ?? 0)} inactifs`} color="default" variant="outlined" />
        <Chip label={`${remuneratedInterns ?? 0} stagiaires rémunérés`} color="primary" variant="outlined" />
        <Chip label={`${(totalInterns ?? 0) - (remuneratedInterns ?? 0)} non rémunérés`} color="default" variant="outlined" />
      </Box>
    </Box>
  );
};