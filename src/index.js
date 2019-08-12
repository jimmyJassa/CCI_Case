import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress className={classes.progress} />
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async getDataAxios(url) {
    const response = await axios.get(url);

    this.setState({
      results: response.data.results,
      nextURL: response.data.next,
      prevURL: response.data.previous
    });
  }

  componentWillMount() {
    this.getDataAxios("https://swapi.co/api/vehicles/");
  }

  render() {
    return (
      <div className="App">
        <h2>Vehicles</h2>
        <DataTable />
      </div>
    );
  }
}

class DataTable extends React.Component {
  constructor() {
    super();
    this.items = [];
    this.state = {};
    this.page = 0;
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async getDataAxios(url) {
    const response = await axios.get(url);
    this.setState({
      results: response.data.results,
      nextURL: response.data.next,
      prevURL: response.data.previous,
      count: response.data.count
    });
  }

  handleSearch(e) {
    this.items = [];

    let url = "https://swapi.co/api/vehicles/";
    if (e.target.value) {
      url = "https://swapi.co/api/vehicles/?search=" + e.target.value;
    }
    this.getDataAxios(url);
  }

  addSearchField() {
    return (
      <div>
        <TextField
          onChange={this.handleSearch}
          id="standard-search"
          label="Search vehicles"
          type="search"
          margin="normal"
        />
      </div>
    );
  }

  componentWillMount() {
    this.getDataAxios("https://swapi.co/api/vehicles/");
  }

  handleChangePage(event, newPage) {
    this.items = [];
    let url = null;
    if (newPage > this.page) {
      this.page += 1;
      url = this.state.nextURL;
    } else {
      this.page -= 1;
      url = this.state.prevURL;
    }
    this.getDataAxios(url);
  }

  updateItems() {
    if (this.state.results != null) {
      this.state.results.forEach(element => {
        this.items.push({
          name: element.name,
          cost: element.cost_in_credits,
          length: element.length
        });
      });
    }
  }

  render() {
    console.log(this.state);

    this.updateItems();
    console.log(this.state);
    return (
      <div>
        {this.addSearchField()}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Cost in credits</TableCell>
                <TableCell align="right">Length</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.items.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.cost}</TableCell>
                  <TableCell align="right">{row.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  colSpan={3}
                  count={this.state.count}
                  rowsPerPage={10}
                  page={this.page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    );
  }
}

class SearchBox extends React.Component {
  constructor() {
    super();
    this.handle = this.handle.bind(this);
  }

  handle(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <TextField
          onChange={this.handle}
          id="standard-search"
          label="Search vehicles"
          type="search"
          margin="normal"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
