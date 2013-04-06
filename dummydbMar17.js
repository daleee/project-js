db.users.insert([
  { userId: "dkarp", firstName: "Dale", lastName: "Karp", email: "dkarp@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "true", registrationDate: new Date("Jan 27, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "jmcdonald", firstName: "Jennifer", lastName: "McDonald", email: "jmcdonald@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "true", registrationDate: new Date("Jan 27, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "dperit", firstName: "David", lastName: "Perit", email: "dperit@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "true", registrationDate: new Date("Jan 27, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "jsilver", firstName: "Jesse", lastName: "Silver", email: "jsilver@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "true", registrationDate: new Date("Jan 27, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "lsantos", firstName: "Louis", lastName: "Santos", email: "lsantos@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "true", registrationDate: new Date("Jan 28, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "jrobertson", firstName: "James", lastName: "Robertson", email: "jrobertson@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "false", registrationDate: new Date("Jan 28, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "ncovello", firstName: "Nadia", lastName: "Covello", email: "ncovello@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "false", registrationDate: new Date("Jan 28, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "vpatel", firstName: "Vijay", lastName: "Patel", email: "vpatel@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "false", registrationDate: new Date("Jan 28, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "yzhang", firstName: "Yue", lastName: "Zhang", email: "yzhang@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "true", registrationDate: new Date("Jan 29, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "dnesbitt", fistName: "David", lastName: "Nesbitt", email: "dnesbitt@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "false", registrationDate: new Date("Jan 29, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "jmartinez", firstName: "Joseph", lastName: "Martinez", email: "jmartinez@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "false", registrationDate: new Date("Jan 29, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" },
  { userId: "sahmed", fistName: "Samira", lastName: "Ahmed", email: "sahmed@pjs.com", password: "projectjs", resetMode: "false", siteAdmin: "false", registrationDate: new Date("Jan 29, 2013"), currentProject: "Project 1", lastModifiedProject: "Project 1" }
]);


db.roles.insert([
  { title: "project manager",
    permissions: [
      "addProject",
      "addUserToProject",
      "editProject",
      "closeProject",
      "viewAllProjects",
      "viewCurrentProject",
      "switchProjects",
      "exportProject",
      "addWorkBreakdownItem",
      "editWorkBreakdownItem",
      "deleteWorkBreakdownItem",
      "addItemToStructure",
      "moveItemInList",
      "viewWBStructure",
      "createStructureAsCopy",
      "undoWBChange",
      "redoWBChange",
      "addWorkPackage",
      "addToWPList",
      "editWorkPackage",
      "deleteWorkPackage",
      "closeWorkPackage",
      "createWPAsCopy",
      "undoWPChange",
      "redoWPChange",
      "viewDependencyTree",
      "addWorkItem",
      "editWorkItem",
      "viewWorkItem",
      "deleteWorkItem",
      "closeWorkItem",
      "addComment",
      "editComment",
      "filterList",
      "addMilestone",
      "editMilestone",
      "deleteMilestone",
      "closeMilestone",
      "viewMilestoneList",
      "viewDeletedMilestones",
      "enableDeletedMilestones",
      "viewWPStatus",
      "viewMSStatus"
    ] },
  { title: "product manager",
    permissions: [
      "viewAllProjects",
      "viewCurrentProject",
      "switchProjects",
      "exportProject",
      "viewWBStructure",
      "viewDependencyTree",
      "viewMilestoneList",
      "viewWPStatus",
      "viewMSStatus"
    ] },
  { title: "project lead",
    permissions: [
      "viewCurrentProject",
      "switchProjects",
      "viewWBStructure",
      "viewDependencyTree",
      "addWorkItem",
      "editWorkItem",
      "viewWorkItem",
      "deleteWorkItem",
      "closeWorkItem",
      "addComment",
      "editComment",
      "filterList"
    ] },
  { title: "developer",
    permissions: [
      "viewCurrentProject",
      "switchProjects",
      "viewWBStructure",
      "viewDependencyTree",
      "editWorkItem",
      "viewWorkItem",
      "closeWorkItem",
      "addComment",
      "editComment",
      "filterList"
    ] },
  { title: "tester",
    permissions: [
      "viewCurrentProject",
      "switchProjects",
      "viewWBStructure",
      "viewDependencyTree",
      "editWorkItem",
      "viewWorkItem",
      "closeWorkItem",
      "addComment",
      "editComment",
      "filterList"
    ] },
  { title: "account manager",
    permissions: [
      "viewCurrentProject",
      "switchProjects",
      "viewMSStatus"
    ] }
]);


db.projects.insert ([
  { title: "Project 1", clientName: "Client 1", projectDueDate: new Date("Apr 30, 2013"), status: "open", completionPercentage: 0,
    dateCreated: new Date("Jan 29, 2013"), lastModifiedDate: new Date("Jan 29, 2013"), dateCompleted: null,
    projectUsers: [
                    { user: "lsantos", role: "project manager" },
                    { user: "jrobertson", role: "product manager" },
                    { user: "ncovello", role: "project lead" },
                    { user: "vpatel", role: "devloper" },
                    { user: "yzhang", role: "developer" },
                    { user: "dnesbitt", role: "tester" },
                    { user: "jmartinez", role: "tester" },
                    { user: "sahmed", role: "account manager" }
    ],
    workBreakdownItems: [
                          { id: "PJ1Platform", index: "1", description: "...", title: "Project1 Platform", ancestors: [ ], parent: null, status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1Power", index: "1.1", description: "...", title: "Project1 Power", ancestors: [ "PJ1Platform" ], parent: "PJ1Platform", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1PowerDetect", index: "1.1.1", description: "...", title: "Project1 Power Detection", ancestors: [ "PJ1Platform", "PJ1Power" ], parent: "PJ1Power", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1DeployCase", index: "1.2", description: "...", title: "Project1 Deployment Casing", ancestors: [ "PJ1Platform" ], parent: "PJ1Platform", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1Antenna", index: "2", description: "...", title: "Project1 Antenna", ancestors: [ ], parent: null, status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1RF", index: "3", description: "...", title: "Project1 RF", ancestors: [ ], parent: null, status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1BasebandInt", index: "3.1", description: "...", title: "Project 1 Baseband Interface", ancestors: [ "PJ1RF" ], parent: "PJ1RF", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1DSPInt", index: "3.2", description: "...", title: "Project1 DSP Interface", ancestors: [ "PJ1RF" ], parent: "PJ1RF", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1DSP", index: "4", description: "...", title: "Project1 DSP", ancestors: [ ], parent: null, status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1RFInt", index: "4.1", description: "...", title: "Project1 RF Interface", ancestors: [ "PJ1DSP" ], parent: "PJ1DSP", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1Core", index: "4.2", description: "...", title: "Project1 Core", ancestors: [ "PJ1DSP" ], parent: "PJ1DSP", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1Output", index: "4.3", description: "...", title: "Project1 Output", ancestors: [ "PJ1DSP" ], parent: "PJ1DSP", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1OutputSelect", index: "4.3.1", description: "...", title: "Project1 Output Selection", ancestors: [ "PJ1DSP", "PJ1Output" ], parent: "PJ1Output", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1OutputTest", index: "4.3.2", description: "...", title: "Project1 Output Testing", ancestors: [ "PJ1DSP", "PJ1Output" ], parent: "PJ1Output", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1Controller", index: "5", description: "...", title: "Project1 Controller", ancestors: [ ], parent: null, status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1EventLoop", index: "5.1", description: "...", title: "Project1 Event Loop", ancestors: [ "PJ1Controller" ], parent: "PJ1Controller", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1AppInt", index: "6", description: "...", title: "Project1 Application Interface", ancestors: [ ], parent: null, status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                          { id: "PJ1Panel", index: "6.1", description: "...", title: "Project1 Panel", ancestors: [ "PJ1AppInt" ], parent: "PJ1AppInt", status: "open", completionPercentage: 0, lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" }
    ],
    workBreakdownStructure: [
                              { items: [
                                  "PJ1Platform",
                                  "PJ1Power",
                                  "PJ1PowerDetect",
                                  "PJ1DeployCase",
                                  "PJ1Antenna",
                                  "PJ1RF",
                                  "PJ1BasebandInt",
                                  "PJ1DSPInt",
                                  "PJ1DSP",
                                  "PJ1RFInt",
                                  "PJ1Core",
                                  "PJ1Output",
                                  "PJ1OutputSelect",
                                  "PJ1OutputTest",
                                  "PJ1Controller",
                                  "PJ1EventLoop",
                                  "PJ1AppInt",
                                  "PJ1Panel"
                                ],
                                lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" }
    ],
    workPackages: [
                    { id: "PJ1Theory", index: 1, description: "...", title: "Project1 Theory", priority: "high", timeEstimate: 5, completionPercentage: 0, status: "open", dependencies: [ ], lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                    { id: "PJ1PlatAssembly", index: 2, description: "...", title: "Project1 Platform Assembly", priority: "high", timeEstimate: 5, completionPercentage: 0, status: "open", dependencies: [ "PJ1Theory" ], lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                    { id: "PJ1AntAssembly", index: 3, description: "...", title: "Project1 Antenna Assembly", priority: "medium", timeEstimate: 7, completionPercentage: 0, status: "open", dependencies: [ "PJ1PlatAssembly" ], lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                    { id: "PJ1RFAssembly", index: 4, description: "...", title: "Project1 RF Assembly", priority: "medium", timeEstimate: 5, completionPercentage: 0, status: "open", dependencies: [ "PJ1PlatAssembly" ], lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                    { id: "PJ1DSPAssembly", index: 5, description: "...", title: "Project1 DSP Assembly", priority: "medium", timeEstimate: 5, completionPercentage: 0, status: "open", dependencies: [ "PJ1PlatAssembly" ], lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                    { id: "PJ1ContAssembly", index: 6, description: "...", title: "Project1 Controller Assembly", timeEstimate: 5, completionPercentage: 0, status: "open", dependencies: [ "PJ1PlatAssembly" ], lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                    { id: "PJ1ApplicationInt", index: 7, description: "...", title: "Project1 Application Interface", priority: "medium", timeEstimate: 5, completionPercentage: 0, status: "open", dependencies: [ "PJ1PlatAssembly" ], lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                    { id: "PJ1FinalRep", index: 8, description: "...", title: "Project1 Final Report WP", priority: "low", timeEstimate: 10, completionPercentage: 0, status: "open", dependencies: [ "PJ1ApplicationInt" ], lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" }
    ],
    workPackageList: [
                        { items: [
                            "PJ1Theory",
                            "PJ1PlatAssembly",
                            "PJ1AntAssembly",
                            "PJ1RFAssembly",
                            "PJ1DSPAssembly",
                            "PJ1ContAssembly",
                            "PJ1ApplicationInt",
                            "PJ1FinalRep"
                          ],
                          lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" }
    ],
    workItems: [
                { id: "PJ1WkItem1", index: 1, description: "...", title: "Project1 Work Item 1", workPackages: [ "PJ1Theory" ], assignedUsers: [ "ncovello", "dnesbitt" ], dependencies: [ ], startDate: new Date("Jan 31, 2013"), timeEstimate: 2, timeSpent: 0, completionPercentage: 0, status: "open",
                  comments: [
                    { index: 1, title: "1st comment Work Item 1", text: "This is work item 1 first comment", postedBy: "jmcdonald", datePosted: new Date("Jan 30, 2013") }
                  ],
                  lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                { id: "PJ1WkItem2", index: 2, description: "...", title: "Project1 Work Item 2", workPackages: [ "PJ1PlatAssembly" ], assignedUsers: [ "vpatel", "jmartinez" ], dependencies: [ "PJ1WkItem1" ], startDate: new Date("Feb 2, 2013"), timeEstimate: 5, timeSpent: 0, completionPercentage: 0, status: "open",
                  comments: [
                    { index: 1, title: "1st comment Work Item 2", text: "This is work item 2 first comment", postedBy: "jmcdonald", datePosted: new Date("Jan 30, 2013") }
                  ],
                  lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                { id: "PJ1WkItem3", index: 3, description: "...", title: "Project1 Work Item 3", workPackages: [ "PJ1PlatAssembly" ], assignedUsers: [ "yzhang", "jmartinez" ], dependencies: [ "PJ1WkItem1" ], startDate: new Date("Feb 2, 2013"), timeEstimate: 5, timeSpent: 0, completionPercentage: 0, status: "open",
                  comments: [
                    { index: 1, title: "1st comment Work Item 3", text: "This is work item 3 first comment", postedBy: "jmcdonald", datePosted: new Date("Jan 30, 2013") }
                  ],
                  lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                { id: "PJ1WkItem4", index: 4, description: "...", title: "Project1 Work Item 4", workPackages: [ "PJ1PlatAssembly" ], assignedUsers: [ "ncovello", "dnesbitt" ], dependencies: [ "PJ1WkItem1" ], startDate: new Date("Feb 7, 2013"), timeEstimate: 5, timeSpent: 0, completionPercentage: 0, status: "open",
                  comments: [
                    { index: 1, title: "1st comment Work Item 4", text: "This is work item 4 first comment", postedBy: "jmcdonald", datePosted: new Date("Jan 30, 2013") }
                  ],
                  lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                { id: "PJ1WkItem5", index: 5, description: "...", title: "Project1 Work Item 5", workPackages: [ "PJ1PlatAssembly" ], assignedUsers: [ "vpatel", "jmartinez" ], dependencies: [ "PJ1WkItem1" ], startDate: new Date("Feb 7, 2013"), timeEstimate: 5, timeSpent: 0, completionPercentage: 0, status: "open",
                  comments: [
                    { index: 1, title: "1st comment Work Item 5", text: "This is work item 5 first comment", postedBy: "jmcdonald", datePosted: new Date("Jan 30, 2013") }
                  ],
                  lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" }
    ],
    workItemList: [
                    { items: [
                        "PJ1WkItem1",
                        "PJ1WkItem2",
                        "PJ1WkItem3",
                        "PJ1WkItem4",
                        "PJ1WkItem5"
                      ],
                      lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" }
    ],
    milestones: [
                  { id: "PJ1TheoryComp", index: 1, description: "...", title: "Project1 Theory Complete", dueDate: new Date("Feb 2, 2013"), priority: "high", completionPercentage: 0, status: "open",
                    wpDependencies: [ "PJ1Theory" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1MatSelect", index: 2, description: "...", title: "Project1 Materials Selected", dueDate: new Date("Feb 7, 2013"), priority: "high", completionPercentage: 0, status: "open",
                    msDependencies: [ "PJ1TheoryComp" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1MatOrdered", index: 3, description: "...", title: "Project1 Materials Ordered", dueDate: new Date("Feb 9, 2013"), priority: "high", completionPercentage: 0, status: "open",
                    msDependencies: [ "PJ1MatSelect" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1MatReceived", index: 4, description: "...", title: "Project1 Materials Received", dueDate: new Date("Feb 16, 2013"), priority: "high", completionPercentage: 0, status: "open",
                    msDependencies: [ "PJ1MatOrdered" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1MatAssembled", index: 5, description: "...", title: "Project1 Materials Assembled", dueDate: new Date("Feb 23, 2013"), priority: "high", completionPercentage: 0, status: "open",
                    msDependencies: [ "PJ1MatReceived" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1MatUnitTested", index: 6, description: "...", title: "Project1 Materials Unit Tested", dueDate: new Date("Mar 1, 2013"), priority: "medium", completionPercentage: 0, status: "open",
                    msDependencies: [ "PJ1MatAssembled" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1IndAssembly33", index: 7, description: "...", title: "Project1 Individual Assembly at 33%", dueDate: new Date("Mar 14, 2013"), priority: "medium", completionPercentage: 0, status: "open",
                    requiredCompletion: [
                      { wkPackage: "PJ1Theory", percentage: 33 },
                      { wkPackage: "PJ1AntAssembly", percentage: 33 },
                      { wkPackage: "PJ1DSPAssembly", percentage: 33 },
                      { wkPackage: "PJ1ContAssembly", percentage: 33 },
                      { wkPackage: "PJ1ApplicationInt", percentage: 33 }
                    ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1MatIntegTested", index: 8, description: "...", title: "Project1 Materials Integration Tested", dueDate: new Date("Mar 21, 2013"), priority: "medium", completionPercentage: 0, status: "open",
                    msDependencies: [ "PJ1IndAssembly33" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1IndAssembly66", index: 9, description: "...", title: "Project1 Individual Assembly at 66%", dueDate: new Date("Mar 28, 2013"), priority: "medium", completionPercentage: 0, status: "open",
                    msRequiredCompletion: [
                      { wkPackage: "PJ1AntAssembly", percentage: 66 },
                      { wkPackage: "PJ1RFAssembly", percentage: 66 },
                      { wkPackage: "PJ1DSPAssembly", percentage: 66 },
                      { wkPackage: "PJ1ContAssembly", percentage: 66 },
                      { wkPackage: "PJ1ApplicationInt", percentage: 66 }
                    ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1TestPulseSend", index: 10, description: "...", title: "Project1 Test Pulse Send", dueDate: new Date("Apr 10, 2013"), priority: "medium", completionPercentage: 0, status: "open",
                    wpDependencies: [
                      "PJ1AntAssembly",
                      "PJ1RFAssembly",
                      "PJ1DSPAssembly",
                      "PJ1ContAssembly",
                      "PJ1ApplicationInt"
                    ],
                    msDependencies: [ "PJ1IndAssembly66" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1TestPulseReceive", index: 11, description: "...", title: "Project1 Test Pulse Receive", dueDate: new Date("Apr 15, 2013"), priority: "medium", completionPercentage: 0, status: "open",
                    msDependencies: [ "PJ1TestPulseSend" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1TestPulseAnalysis", index: 12, description: "...", title: "Project1 Test Pulse Analysis", dueDate: new Date("Apr 20, 2013"), priority: "medium", completionPercentage: 0, status: "open",
                    msDependencies: [ "PJ1TestPulseReceive" ],
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" },
                  { id: "PJ1FinalRpt", index: 13, description: "...", title: "Project1 Final Report MS", dueDate: new Date("Apr 27, 2013"), priority: "low", completionPercentage: 0, status: "open",
                    lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" }
    ],
    milestoneList: [
                      { items: [
                        "PJ1TheoryComp",
                        "PJ1MatSelect",
                        "PJ1MatOrdered",
                        "PJ1MatReceived",
                        "PJ1MatAssembled",
                        "PJ1MatUnitTested",
                        "PJ1IndAssembly33",
                        "PJ1MatIntegTested",
                        "PJ1IndAssembly66",
                        "PJ1TestPulseSend",
                        "PJ1TestPulseReceive",
                        "PJ1TestPulseAnalysis",
                        "PJ1FinalRpt"
                        ],
                        lastModifiedDate: new Date("Jan 30, 2013"), lastModifiedBy: "jmcdonald" }
    ]
}]);