import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, IconButton, Paper, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { log } from './loggingMiddleware';

interface UrlInput {
  longUrl: string;
  validity: string;
  shortcode: string;
}

const MAX_URLS = 5;

function ShortenerPage() {
  const [urls, setUrls] = useState<UrlInput[]>([{ longUrl: '', validity: '', shortcode: '' }]);
  const [errors, setErrors] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    log('frontend', 'info', 'page', 'Shortener page loaded');
  }, []);

  const handleChange = (idx: number, field: keyof UrlInput, value: string) => {
    const newUrls = [...urls];
    newUrls[idx][field] = value;
    setUrls(newUrls);
  };

  const addUrl = () => {
    if (urls.length < MAX_URLS) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const removeUrl = (idx: number) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== idx));
    }
  };

  const validate = (): boolean => {
    const errs: string[] = [];
    urls.forEach((u, i) => {
      try {
        if (!u.longUrl.trim()) throw new Error(`URL #${i + 1}: URL is required`);
        try { new URL(u.longUrl); } catch { throw new Error(`URL #${i + 1}: Invalid URL format`); }
        if (u.validity && (!/^[0-9]+$/.test(u.validity) || parseInt(u.validity) <= 0)) throw new Error(`URL #${i + 1}: Validity must be a positive integer`);
        if (u.shortcode && !/^[a-zA-Z0-9]{1,20}$/.test(u.shortcode)) throw new Error(`URL #${i + 1}: Shortcode must be alphanumeric and up to 20 chars`);
      } catch (e: any) {
        errs.push(e.message);
        log('frontend', 'error', 'component', e.message);
      }
    });
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResults([]);
    if (!validate()) return;
    // TODO: Call backend or local logic to generate short links, log actions
    log('frontend', 'info', 'component', 'Shorten URLs submitted');
    setResults(urls.map((u, i) => ({ short: 'short.ly/' + (u.shortcode || 'auto' + i), ...u, expiry: new Date(Date.now() + ((parseInt(u.validity) || 30) * 60000)).toLocaleString() })));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Shorten up to 5 URLs</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {urls.map((u, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} md={5}>
                <TextField label="Long URL" value={u.longUrl} onChange={e => handleChange(idx, 'longUrl', e.target.value)} fullWidth required />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField label="Validity (min)" value={u.validity} onChange={e => handleChange(idx, 'validity', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField label="Shortcode (optional)" value={u.shortcode} onChange={e => handleChange(idx, 'shortcode', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => removeUrl(idx)} disabled={urls.length === 1}><RemoveCircleIcon /></IconButton>
                {idx === urls.length - 1 && urls.length < MAX_URLS && (
                  <IconButton onClick={addUrl}><AddCircleIcon /></IconButton>
                )}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        {errors.length > 0 && errors.map((err, i) => <Alert severity="error" key={i}>{err}</Alert>)}
        <Box mt={2}>
          <Button type="submit" variant="contained">Shorten</Button>
        </Box>
      </form>
      <Box mt={4}>
        <Typography variant="h6">Results</Typography>
        {results.length === 0 ? <Typography>No results yet.</Typography> : (
          <ul>
            {results.map((r, i) => (
              <li key={i}>{r.short} (expires: {r.expiry}) - {r.longUrl}</li>
            ))}
          </ul>
        )}
      </Box>
    </Paper>
  );
}

function StatisticsPage() {
  useEffect(() => {
    log('frontend', 'info', 'page', 'Statistics page loaded');
  }, []);
  // TODO: Implement statistics table and click details
  return <div>Statistics Page (to be implemented)</div>;
}

function App() {
  useEffect(() => {
    log('frontend', 'info', 'page', 'App loaded');
  }, []);
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>AffordMed URL Shortener</Typography>
          <Typography sx={{ mr: 2 }}>Welcome, mohd suheb siddique</Typography>
          <Button color="inherit" component={Link} to="/">Shortener</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatisticsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
