import React from "react";
import {
  createStyles,
  FormControl,
  InputBase,
  InputLabel,
  NativeSelect,
  withStyles,
} from "@material-ui/core";
import styles from "./style";
const BootstrapInput = withStyles((theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const DropDown = (props) => {
  const { value, onChange, options, label } = props;
  const classes = styles();
  return (
    <div className={classes.root}>
      <FormControl fullWidth>
        <InputLabel htmlFor="currency">{label}</InputLabel>
        <NativeSelect
          fullWidth
          id="currency"
          value={value}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default DropDown;
