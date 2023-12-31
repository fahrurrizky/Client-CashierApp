// import { FormControl, FormLabel, MenuItem, Select } from "@chakra-ui/react";
// import React, { useState } from "react";
// import ReactDOM from "react-dom";

// function Filter() {
//   const [responsive, setResponsive] = useState("vertical");
//   const [tableBodyHeight, setTableBodyHeight] = useState("400px");
//   const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

//   const columns = ["Name", "Title", "Location"];

//   const options = {
//     filter: true,
//     filterType: "dropdown",
//     responsive,
//     tableBodyHeight,
//     tableBodyMaxHeight,
//   };

//   const data = [
//     ["Gabby George", "Business Analyst", "Minneapolis"],
//     [
//       "Aiden Lloyd",
//       "Business Consultant for an International Company and CEO of Tony's Burger Palace",
//       "Dallas",
//     ],
//     ["Jaden Collins", "Attorney", "Santa Ana"],
//     ["Franky Rees", "Business Analyst", "St. Petersburg"],
//     ["Aaren Rose", null, "Toledo"],
//     ["Johnny Jones", "Business Analyst", "St. Petersburg"],
//     ["Jimmy Johns", "Business Analyst", "Baltimore"],
//     ["Jack Jackson", "Business Analyst", "El Paso"],
//     ["Joe Jones", "Computer Programmer", "El Paso"],
//     ["Jacky Jackson", "Business Consultant", "Baltimore"],
//     ["Jo Jo", "Software Developer", "Washington DC"],
//     ["Donna Marie", "Business Manager", "Annapolis"],
//   ];

//   return (
//     <React.Fragment>
//       <FormControl>
//         <FormLabel>Responsive Option</FormLabel>
//         <Select
//           value={responsive}
//           style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
//           onChange={(e) => setResponsive(e.target.value)}
//         >
//           <MenuItem value={"vertical"}>vertical</MenuItem>
//           <MenuItem value={"standard"}>standard</MenuItem>
//           <MenuItem value={"simple"}>simple</MenuItem>
//           <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
//           <MenuItem value={"scrollMaxHeight"}>
//             scrollMaxHeight (deprecated)
//           </MenuItem>
//           <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl>
//         <FormLabel>Table Body Height</FormLabel>
//         <Select
//           value={tableBodyHeight}
//           style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
//           onChange={(e) => setTableBodyHeight(e.target.value)}
//         >
//           <MenuItem value={""}>[blank]</MenuItem>
//           <MenuItem value={"400px"}>400px</MenuItem>
//           <MenuItem value={"800px"}>800px</MenuItem>
//           <MenuItem value={"100%"}>100%</MenuItem>
//         </Select>
//       </FormControl>
//       <table>
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={col}>{col}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               {row.map((cell, cellIndex) => (
//                 <td key={cellIndex}>{cell}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </React.Fragment>
//   );
// }

// export default Filter;

// ReactDOM.render(<Filter />, document.getElementById("root"));
