exports.users = [{
    _id: "dkarp",
    userId: "dkarp",
    firstName: "Dale",
    lastName: "Karp",
    email: "dkarp@pjs.com",
    password: "projectjs",
    siteAdmin: "true",
    registrationDate: new Date('Jan 27, 2013')
}, {
    _id: "jmcdonald",
    userId: "jmcdonald",
    firstName: "Jennifer",
    lastName: "McDonald",
    email: "jmcdonald@pjs.com",
    password: "projectjs",
    siteAdmin: "true",
    registrationDate: new Date('Jan 27, 2013')
}, {
    _id: "dperit",
    userId: "dperit",
    firstName: "David",
    lastName: "Perit",
    email: "dperit@pjs.com",
    password: "projectjs",
    siteAdmin: "true",
    registrationDate: new Date('Jan 27, 2013')
}, {
    _id: "jsilver",
    userId: "jsilver",
    firstName: "Jesse",
    lastName: "Silver",
    email: "jsilver@pjs.com",
    password: "projectjs",
    siteAdmin: "true",
    registrationDate: new Date('Jan 27, 2013')
}, {
    _id: "jlennon",
    userId: "jlennon",
    firstName: "John",
    lastName: "Lennon",
    email: "jlennon@pjs.com",
    password: "projectjs",
    siteAdmin: "true",
    registrationDate: new Date('Jan 28, 2013')
}, {
    _id: "pmccartney",
    userId: "pmccartney",
    firstName: "Paul",
    lastName: "McCartney",
    email: "pmccartney@pjs.com",
    password: "projectjs",
    siteAdmin: "false",
    registrationDate: new Date('Jan 28, 2013')
}, {
    _id: "gharrison",
    userId: "gharrison",
    firstName: "George",
    lastName: "Harrison",
    email: "gharrison@pjs.com",
    password: "projectjs",
    siteAdmin: "false",
    registrationDate: new Date('Jan 28, 2013')
}, {
    _id: "rstarkey",
    userId: "rstarkey",
    firstName: "Richard",
    lastName: "Starkey",
    email: "rstarkey@pjs.com",
    password: "projectjs",
    siteAdmin: "false",
    registrationDate: new Date('Jan 28, 2013')
}, {
    _id: "mjagger",
    userId: "mjagger",
    firstName: "Mick",
    lastName: "Jagger",
    email: "mjagger@pjs.com",
    password: "projectjs",
    siteAdmin: "true",
    registrationDate: new Date('Jan 29, 2013')
}, {
    _id: "krichards",
    userId: "krichards",
    fistName: "Keith",
    lastName: "Richards",
    email: "krichards@pjs.com",
    password: "projectjs",
    siteAdmin: "false",
    registrationDate: new Date('Jan 29, 2013')
}, {
    _id: "bjones",
    userId: "bjones",
    firstName: "Brian",
    lastName: "Jones",
    email: "bjones@pjs.com",
    password: "projectjs",
    siteAdmin: "false",
    registrationDate: new Date('Jan 29, 2013')
}, {
    _id: "cwatts",
    userId: "cwatts",
    fistName: "Charlie",
    lastName: "Watts",
    email: "cwatts@pjs.com",
    password: "projectjs",
    siteAdmin: "false",
    registrationDate: new Date('Jan 29, 2013')
}];

exports.roles = [{
    _id: "projectmanager",
    title: "project manager",
    accessLevel: 3
}, {
    _id: "productmanager",
    title: "product manager",
    accessLevel: 3
}, {
    _id: "projectlead",
    title: "project lead",
    accessLevel: 2
}, {
    _id: "developer",
    title: "developer",
    accessLevel: 1
}, {
    _id: "tester",
    title: "tester",
    accessLevel: 1
}, {
    _id: "accountmanager",
    title: "account manager",
    accessLevel: 3
}];

exports.projects = [{
    _id: "project1",
    title: "Project 1",
    clientName: "Client 1",
    dueDate: new Date('Apr 30, 2013'),
    status: "open",
    completionPercentage: 0,
    dateCreated: new Date('Jan 29, 2013'),
    lastModifiedDate: new Date('Jan 29, 2013'),
    dateCompleted: null,
    projectUsers: [{
        user: "jlennon",
        role: "projectmanager"
    }, {
        user: "pmccartney",
        role: "productmanager"
    }, {
        user: "gharrison",
        role: "developer"
    }, {
        user: "rstarkey",
        role: "tester"
    }],
    workBreakdownItems: [{
        _id: "PJ1Platform",
        ancestors: [],
        parent: null,
        itemNumber: 1,
        description: "Project1 Platform",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1Power",
        ancestors: ["PJ1Platform"],
        parent: "PJ1Platform",
        itemNumber: 1.1,
        description: "Project1 Power",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1DeployCase",
        ancestors: ["PJ1Platform"],
        parent: "PJ1Platform",
        itemNumber: 1.2,
        description: "Project1 Deployment Casing",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1Antenna",
        ancestors: [],
        parent: null,
        itemNumber: 2,
        description: "Project1 Antenna",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1RF",
        ancestors: [],
        parent: null,
        itemNumber: 3,
        description: "Project1 RF",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1BasebandInt",
        ancestors: ["PJ1RF"],
        parent: "PJ1RF",
        itemNumber: 3.1,
        description: "Project 1 Baseband Interface",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1DSPInt",
        ancestors: ["PJ1RF"],
        parent: "PJ1RF",
        itemNumber: 3.2,
        description: "Project1 DSP Interface",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1DSP",
        ancestors: [],
        parent: null,
        itemNumber: 4,
        description: "Project1 DSP",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1RFInt",
        ancestors: ["PJ1DSP"],
        parent: "PJ1DSP",
        itemNumber: 4.1,
        description: "Project1 RF Interface",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1Core",
        ancestors: ["PJ1DSP"],
        parent: "PJ1DSP",
        itemNumber: 4.2,
        description: "Project1 Core",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1Output",
        ancestors: ["PJ1DSP"],
        parent: "PJ1DSP",
        itemNumber: 4.3,
        description: "Project 1 Output",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1Controller",
        ancestors: [],
        parent: null,
        itemNumber: 5,
        description: "Project1 Controller",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1EventLoop",
        ancestors: ["PJ1Controller"],
        parent: "PJ1Controller",
        itemNumber: 5.1,
        description: "Project1 Event Loop",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1AppInt",
        ancestors: [],
        parent: null,
        itemNumber: 6,
        description: "Project1 Application Interface",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1Panel",
        ancestors: ["PJ1AppInt"],
        parent: "PJ1AppInt",
        itemNumber: 6.1,
        description: "Project1 Panel",
        status: "open",
        completionPercentage: 0,
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }],
    workBreakdownStructure: [{
      name:"Project 1",
        items: [
          {name:"PJ1Platform",items:[]},
            {name:"PJ1Power",items:[]},
            {name:"PJ1DeployCase",items:[]},
            {name:"PJ1Antenna",items:[]},
            {name:"PJ1RF",items:[]},
            {name:"PJ1BasebandInt",items:[]},
            {name:"PJ1DSPInt",items:[]},
            {name:"PJ1DSP",items:[]},
            {name:"PJ1RFInt",items:[]},
            {name:"PJ1Core",items:[]},
            {name:"PJ1Output",items:[]},
            {name:"PJ1Controller",items:[]},
            {name:"PJ1EventLoop",items:[]},
            {name:"PJ1AppInt",items:[]},
            {name:"PJ1Panel",items:[]}],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }],
    workPackages: [{
        _id: "PJ1Theory",
        wpNumber: 1,
        title: "Project1 Theory",
        description: "...",
        priority: "high",
        timeEstimate: 5,
        completionPercentage: 0,
        status: "open",
        dependencies: [],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1PlatAssembly",
        wpNumber: 2,
        title: "Project1 Platform Assembly",
        description: "...",
        priority: "high",
        timeEstimate: 5,
        completionPercentage: 0,
        status: "open",
        dependencies: ["PJ1Theory"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1AntAssembly",
        wpNumber: 3,
        title: "Project1 Antenna Assembly",
        description: "...",
        priority: "medium",
        timeEstimate: 7,
        completionPercentage: 0,
        status: "open",
        dependencies: ["PJ1PlatAssembly"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1RFAssembly",
        wpNumber: 4,
        title: "Project1 RF Assembly",
        description: "...",
        priority: "medium",
        timeEstimate: 5,
        completionPercentage: 0,
        status: "open",
        dependencies: ["PJ1PlatAssembly"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1DSPAssembly",
        wpNumber: 5,
        title: "Project1 DSP Assembly",
        description: "...",
        priority: "medium",
        timeEstimate: 5,
        completionPercentage: 0,
        status: "open",
        dependencies: ["PJ1PlatAssembly"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1ContAssembly",
        wpNumber: 6,
        title: "Project1 Controller Assembly",
        description: "...",
        timeEstimate: 5,
        completionPercentage: 0,
        status: "open",
        dependencies: ["PJ1PlatAssembly"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1ApplicationInt",
        wpNumber: 7,
        title: "Project1 Application Interface",
        description: "...",
        priority: "medium",
        timeEstimate: 5,
        completionPercentage: 0,
        status: "open",
        dependencies: ["PJ1PlatAssembly"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1FinalRep",
        wpNumber: 8,
        title: "Project1 Final Report WP",
        description: "...",
        priority: "low",
        timeEstimate: 10,
        completionPercentage: 0,
        status: "open",
        dependencies: ["PJ1ApplicationInt"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }],
    workPackageList: [{
        items: [
            "PJ1Theory",
            "PJ1PlatAssembly",
            "PJ1AntAssembly",
            "PJ1RFAssembly",
            "PJ1DSPAssembly",
            "PJ1ContAssembly",
            "PJ1ApplicationInt",
            "PJ1FinalRep"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }],
    workItems: [{
        _id: "PJ1WkItem1",
        itemNumber: 1,
        title: "Project1 Work Item 1",
        description: "...",
        workPackages: ["PJ1Theory"],
        assignedUsers: ["gharrison", "rstarkey"],
        dependencies: [],
        startDate: new Date('Jan 31, 2013'),
        timeEstimate: 2,
        timeSpent: 0,
        completionPercentage: 0,
        status: "open",
        comments: [{
            commentNumber: 1,
            title: "1st comment Work Item 1",
            text: "This is work item 1 first comment",
            postedBy: "jmcdonald",
            datePosted: new Date('Jan 30, 2013')
        }],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1WkItem2",
        itemNumber: 2,
        title: "Project1 Work Item 2",
        description: "...",
        workPackages: ["PJ1PlatAssembly"],
        assignedUsers: ["gharrison"],
        dependencies: ["PJ1WkItem1"],
        startDate: new Date('Feb 2, 2013'),
        timeEstimate: 5,
        timeSpent: 0,
        completionPercentage: 0,
        status: "open",
        comments: [{
            commentNumber: 1,
            title: "1st comment Work Item 2",
            text: "This is work item 2 first comment",
            postedBy: "jmcdonald",
            datePosted: new Date('Jan 30, 2013')
        }],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1WkItem3",
        itemNumber: 3,
        title: "Project1 Work Item 3",
        description: "...",
        workPackages: ["PJ1PlatAssembly"],
        assignedUsers: ["rstarkey"],
        dependencies: ["PJ1WkItem1"],
        startDate: new Date('Feb 2, 2013'),
        timeEstimate: 5,
        timeSpent: 0,
        completionPercentage: 0,
        status: "open",
        comments: [{
            commentNumber: 1,
            title: "1st comment Work Item 3",
            text: "This is work item 3 first comment",
            postedBy: "jmcdonald",
            datePosted: new Date('Jan 30, 2013')
        }],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1WkItem4",
        itemNumber: 4,
        title: "Project1 Work Item 4",
        description: "...",
        workPackages: ["PJ1PlatAssembly"],
        assignedUsers: ["gharrison"],
        dependencies: ["PJ1WkItem1"],
        startDate: new Date('Feb 7, 2013'),
        timeEstimate: 5,
        timeSpent: 0,
        completionPercentage: 0,
        status: "open",
        comments: [{
            commentNumber: 1,
            title: "1st comment Work Item 4",
            text: "This is work item 4 first comment",
            postedBy: "jmcdonald",
            datePosted: new Date('Jan 30, 2013')
        }],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1WkItem5",
        itemNumber: 5,
        title: "Project1 Work Item 5",
        description: "...",
        workPackages: ["PJ1PlatAssembly"],
        assignedUsers: ["rstarkey"],
        dependencies: ["PJ1WkItem1"],
        startDate: new Date('Feb 7, 2013'),
        timeEstimate: 5,
        timeSpent: 0,
        completionPercentage: 0,
        status: "open",
        comments: [{
            commentNumber: 1,
            title: "1st comment Work Item 5",
            text: "This is work item 5 first comment",
            postedBy: "jmcdonald",
            datePosted: new Date('Jan 30, 2013')
        }],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }],
    workItemList: [{
        items: [
            "PJ1WkItem1",
            "PJ1WkItem2",
            "PJ1WkItem3",
            "PJ1WkItem4",
            "PJ1WkItem5"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }],
    milestones: [{
        _id: "PJ1TheoryComp",
        msNumber: 1,
        title: "Project1 Theory Complete",
        description: "...",
        dueDate: new Date('Feb 2, 2013'),
        priority: "high",
        completionPercentage: 0,
        status: "open",
        wpDependencies: ["PJ1Theory"],
        msDependencies: [],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1MatSelect",
        msNumber: 2,
        title: "Project1 Materials Selected",
        description: "...",
        dueDate: new Date('Feb 7, 2013'),
        priority: "high",
        completionPercentage: 0,
        status: "open",
        msDependencies: ["PJ1TheoryComp"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1MatOrdered",
        msNumber: 3,
        title: "Project1 Materials Ordered",
        description: "...",
        dueDate: new Date('Feb 9, 2013'),
        priority: "high",
        completionPercentage: 0,
        status: "open",
        msDependencies: ["PJ1MatSelect"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1MatReceived",
        msNumber: 4,
        title: "Project1 Materials Received",
        description: "...",
        dueDate: new Date('Feb 16, 2013'),
        priority: "high",
        completionPercentage: 0,
        status: "open",
        msDependencies: ["PJ1MatOrdered"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1MatAssembled",
        msNumber: 5,
        title: "Project1 Materials Assembled",
        description: "...",
        dueDate: new Date('Feb 23, 2013'),
        priority: "high",
        completionPercentage: 0,
        status: "open",
        msDependencies: ["PJ1MatReceived"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1MatUnitTested",
        msNumber: 6,
        title: "Project1 Materials Unit Tested",
        description: "...",
        dueDate: new Date('Mar 1, 2013'),
        priority: "medium",
        completionPercentage: 0,
        status: "open",
        msDependencies: ["PJ1MatAssembled"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1IndAssembly33",
        msNumber: 7,
        title: "Project1 Individual Assembly at 33%",
        description: "...",
        dueDate: new Date('Mar 14, 2013'),
        priority: "medium",
        completionPercentage: 0,
        status: "open",
        msDependencies: [],
        requiredCompletion: [{
            wkpackage: "PJ1Theory",
            percentage: 33
        }, {
            wkpackage: "PJ1AntAssembly",
            percentage: 33
        }, {
            wkpackage: "PJ1DSPAssembly",
            percentage: 33
        }, {
            wkpackage: "PJ1ContAssembly",
            percentage: 33
        }, {
            wkpackage: "PJ1ApplicationInt",
            percentage: 33
        }],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1MatIntegTested",
        msNumber: 8,
        title: "Project1 Materials Integration Tested",
        description: "...",
        dueDate: new Date('Mar 21, 2013'),
        priority: "medium",
        completionPercentage: 0,
        status: "open",
        msDependencies: ["PJ1IndAssembly33"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1IndAssembly66",
        msNumber: 9,
        title: "Project1 Individual Assembly at 66%",
        description: "...",
        dueDate: new Date('Mar 28, 2013'),
        priority: "medium",
        completionPercentage: 0,
        status: "open",
        msDependencies: [],
        msRequiredCompletion: [{
            wkpackage: "PJ1AntAssembly",
            percentage: 66
        }, {
            wkpackage: "PJ1RFAssembly",
            percentage: 66
        }, {
            wkpackage: "PJ1DSPAssembly",
            percentage: 66
        }, {
            wkpackage: "PJ1ContAssembly",
            percentage: 66
        }, {
            wkpackage: "PJ1ApplicationInt",
            percentage: 66
        }],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1TestPulseSend",
        msNumber: 10,
        title: "Project1 Test Pulse Send",
        description: "...",
        dueDate: new Date('Apr 10, 2013'),
        priority: "medium",
        completionPercentage: 0,
        status: "open",
        wpDependencies: [
            "PJ1AntAssembly",
            "PJ1RFAssembly",
            "PJ1DSPAssembly",
            "PJ1ContAssembly",
            "PJ1ApplicationInt"],
        msDependencies: ["PJ1IndAssembly66"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1TestPulseReceive",
        msNumber: 11,
        title: "Project1 Test Pulse Receive",
        description: "...",
        dueDate: new Date('Apr 15, 2013'),
        priority: "medium",
        completionPercentage: 0,
        status: "open",
        msDependencies: ["PJ1TestPulseSend"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1TestPulseAnalysis",
        msNumber: 12,
        title: "Project1 Test Pulse Analysis",
        description: "...",
        dueDate: new Date('Apr 20, 2013'),
        priority: "medium",
        completionPercentage: 0,
        status: "open",
        msDependencies: ["PJ1TestPulseReceive"],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }, {
        _id: "PJ1FinalRpt",
        msNumber: 13,
        title: "Project1 Final Report MS",
        description: "...",
        dueDate: new Date('Apr 27, 2013'),
        priority: "low",
        completionPercentage: 0,
        status: "open",
        msDependencies: [],
        lastModifiedDate: new Date('Jan 30, 2013'),
        lastModifiedBy: "jmcdonald"
    }],
    milestoneList: [{
        items: [
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
            "PJ1FinalRpt"]
    }]

}];