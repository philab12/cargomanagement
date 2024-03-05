import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

function CustomFooterTotalComponent({grandTotal}) {
  return (
    <Box sx={{ padding: "10px", marginLeft:"10px", fontSize:"20px" }}>Total : {grandTotal}</Box>
  );
}

CustomFooterTotalComponent.propTypes = {
  total: PropTypes.number
};

export { CustomFooterTotalComponent };