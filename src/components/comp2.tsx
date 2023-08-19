import React, { useState } from 'react';
import { Checkbox,Collapse,List,ListItem,ListItemIcon,ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departmentData = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  const handleToggle = (name: string, isDepartment: boolean) => () => {
    if (isDepartment) {
      const subDepartments = departmentData.find(
        (dept) => dept.department === name
      )?.sub_departments;

      if (subDepartments) {
        const allSelected = subDepartments.every((subDept) =>
          selected.includes(subDept)
        );

        let newSelected: string[] = [];
        if (!allSelected) {
          newSelected = selected.concat(subDepartments);
        } else {
          newSelected = selected.filter(
            (subDept) => !subDepartments.includes(subDept)
          );
        }

        setSelected(newSelected);
        return;
      }
    }

    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleCollapse = (index: number) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const isParentSelected = (department: string) => {
    const subDepartments = departmentData.find(
      (dept) => dept.department === department
    )?.sub_departments;

    return subDepartments?.every((subDept) => selected.includes(subDept));
  };

  return (
    <List >
      {departmentData.map((department, index) => (
        <div key={index}>
          <ListItem button onClick={() => handleCollapse(index)}>
            <ListItemIcon>
              <Checkbox
                checked={isParentSelected(department.department)}
                onClick={handleToggle(department.department, true)}
              />
            </ListItemIcon>
            <ListItemText
              primary={department.department}
              style={{ paddingLeft: '5px' }}
            />
            <ListItemIcon style={{ marginLeft: 'auto' }}>
              {open === index ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItem>
          <Collapse in={open === index} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.sub_departments.map((subDept, subIndex) => (
                <ListItem key={subIndex} >
                  <ListItemIcon style={{ marginRight: '5px', paddingLeft: '40px' }}>
                    <Checkbox
                      checked={selected.includes(subDept)}
                      onClick={handleToggle(subDept, false)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
