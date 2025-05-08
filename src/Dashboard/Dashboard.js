import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  Card,
  CardBody,
  Progress
} from "reactstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
  Legend, 
  Area
} from "recharts";



import {
  FaUsers,
  FaDollarSign,
  FaTasks
} from "react-icons/fa";
import NavBar from "../NavBar/NavBar";
import SideNav from "../SideNav/SideNav";

const Dashboard = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setSideNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (sideNavOpen) {
      document.body.classList.add("side-nav-open");
    } else {
      document.body.classList.remove("side-nav-open");
    }
  }, [sideNavOpen]);

  const barChartData = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 300 },
    { name: "Mar", sales: 500 },
    { name: "Apr", sales: 700 },
    { name: "May", sales: 600 },
  ];

  const mixedChartData = [
    { name: "A", uv: 10, pv: 30, amt: 60 },
    { name: "B", uv: 30, pv: 40, amt: 45 },
    { name: "C", uv: 60, pv: 20, amt: 35 },
    { name: "D", uv: 20, pv: 30, amt: 65 },
    { name: "E", uv: 50, pv: 10, amt: 55 },
    { name: "F", uv: 10, pv: 20, amt: 25 },
  ];

  const metrics = [
    { title: "Budget", value: "$24k", icon: FaDollarSign, color: "primary", change: "+12%", direction: "up" },
    { title: "Total Customers", value: "1.6k", icon: FaUsers, color: "success", change: "-16%", direction: "down" },
    { title: "Task Progress", value: "75.5%", icon: FaTasks, color: "warning", progress: 75.5 },
    { title: "Total Profit", value: "$15k", icon: FaDollarSign, color: "info", change: "+8%", direction: "up" },
  ];

  const donutData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const donutColors = ["#66c2a5", "#fc8d62", "#8da0cb", "#ffd92f"];

  const uniqueVisitorData = [
    { day: "Mon", pageViews: 30, sessions: 10 },
    { day: "Tue", pageViews: 40, sessions: 35 },
    { day: "Wed", pageViews: 50, sessions: 30 },
    { day: "Thu", pageViews: 45, sessions: 25 },
    { day: "Fri", pageViews: 50, sessions: 30 },
    { day: "Sat", pageViews: 110, sessions: 60 },
    { day: "Sun", pageViews: 100, sessions: 50 },
  ];
  

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <NavBar toggleSideNav={toggleSideNav} />
            <SideNav sideNavOpen={sideNavOpen} toggleSideNav={toggleSideNav} />
            <main className={`main-content ${sideNavOpen ? "shifted" : ""}`}>

             

                <div className="row mt-3">
                  {metrics.map((metric, index) => (
                    <div className="col-md-3" key={index}>
                      <Card className="shadow-sm rounded border-0 h-100">
                        <CardBody className="d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted text-uppercase small">{metric.title}</span>
                            <div className={`bg-${metric.color} bg-opacity-10 p-2 rounded-circle`}>
                              <metric.icon size={18} className={`text-${metric.color}`} />
                            </div>
                          </div>
                          <div className="d-flex align-items-baseline">
                            <h3 className="mb-0 me-2">{metric.value}</h3>
                            {metric.change && (
                              <span className={`small ${metric.direction === "up" ? "text-success" : "text-danger"}`}>
                                {metric.change}
                              </span>
                            )}
                          </div>
                          {metric.progress && <Progress value={metric.progress} className="mt-2" />}
                          {metric.change && <span className="text-muted small mt-2">Since last month</span>}
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>

               {/* Unique Visitor Line Chart */}
               <div className="row mt-3">
                  <div className="col-md-12">
                    <Card className="shadow-sm rounded border-0 h-100">
                      <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0">Unique Visitor</h5>
                          <div className="d-flex gap-2">
                            <button className="btn btn-outline-secondary
                            
                            
                            btn-sm active">Week</button>
                            <button className="btn btn-outline-secondary btn-sm">Month</button>
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                          <ComposedChart data={uniqueVisitorData}>
                            <defs>
                              <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#69b3f9" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#69b3f9" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3366cc" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3366cc" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="pageViews" stroke="#69b3f9" fillOpacity={1} fill="url(#colorPageViews)" />
                            <Area type="monotone" dataKey="sessions" stroke="#3366cc" fillOpacity={1} fill="url(#colorSessions)" />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </CardBody>
                    </Card>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="row mt-3">
                  {/* Sales Overview Bar Chart */}
                  <div className="col-md-6">
                    <Card className="shadow-sm rounded border-0 h-100">
                      <CardBody>
                        <h5 className="text-center mb-3">Sales Overview</h5>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={barChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#333" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#007bff" barSize={50} radius={[10, 10, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Donut Chart */}
                  <div className="col-md-6">
                    <Card className="shadow-sm rounded border-0 h-100">
                      <CardBody className="text-center">
                        <h5 className="fw-bold">Main title</h5>
                        <p className="text-muted mb-3">Secondary title</p>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={donutData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {donutData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={donutColors[index % donutColors.length]} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </CardBody>
                    </Card>
                  </div>

                </div>

                {/* Mixed Chart */}
                <div className="row mt-3">
                  <div className="col-md-6">
                    <Card className="shadow-sm rounded border-0 h-100">
                      <CardBody>
                        <h5 className="text-center mb-3">Status and Activity Chart</h5>
                        <ResponsiveContainer width="100%" height={300}>
                          <ComposedChart data={mixedChartData}>
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" orientation="left" tick={{ fill: "#ff69b4" }} />
                            <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => (value > 30 ? "ON" : "OFF")} tick={{ fill: "#1e90ff" }} />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="left" dataKey="amt" barSize={30} fill="#ffb6c1" />
                            <Bar yAxisId="left" dataKey="pv" barSize={30} fill="#ffd966" />
                            <Bar yAxisId="left" dataKey="uv" barSize={30} fill="#76c7c0" />
                            <Line yAxisId="right" type="monotone" dataKey="pv" stroke="#1e90ff" strokeWidth={3} dot={false} />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </CardBody>
                    </Card>
                  </div>
                </div>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;