
# Elasticsearch
### From Elasticsearch - The Definitive Guide:

> Elasticsearch is a real-time distributed search and analytics engine. It allows you to explore your data at a speed and at a scale never before possible. It is used for full-text search, structured search, analytics, and all three in combination:
>
> - [Wikipedia](http://wikipedia.org/) uses Elasticsearch to provide full-text search with highlighted search snippets, and search-as-you-type and did-you-mean suggestions.
> - [The Guardian](http://theguardian.com/) uses Elasticsearch to combine visitor logs with social -network data to provide real-time feedback to its editors about the public’s response to new articles.
> - [Stack Overflow](http://stackoverflow.com/) combines full-text search with geolocation queries and uses more-like-this to find related questions and answers.
> - [GitHub](https://github.com/) uses Elasticsearch to query 130 billion lines of code.

The website is [https://elastic.co/](https://elastic.co/) with documentation available at [https://elastic.co/learn/](https://elastic.co/learn/). The documentation includes  an [online](http://elastic.co/guide/en/elasticsearch/guide/current/index.html) version of the book [Elasticsearch - The Definitive Guide](http://amazon.com/Elasticsearch-Definitive-Guide-Clinton-Gormley/dp/1449358543/).

This document contains information from these official documentation sources with a sprinkling of my own comments.

## Installation
Elasticsearch can be downloaded as a zip file from [https://elastic.co/downloads/](https://elastic.co/downloads/). Installation is as simple as unzipping the file in the location of your choosing. I created a folder named `apps` in my home folder (C:\Users\jshea\apps) and unzipped Elasticsearch in this folder. This makes my Elasticsearch bin folder `C:\Users\jshea\apps\elasticsearch\bin` and this path will be used in the following documentation.

## Configuration
Elasticsearch will run without any configuration changes. The configuration parameters are set in elasticsearch\config\elasticsearch.yml. The following are a couple of items you may want to consider:
### cluster.name
By default Elasticsearch nodes will create or join a cluster named `elasticsearch`. This is fine if you're the only system running Elasticsearch on your subnet for example at home. At work you probably don't want your cluster joining mine by accident. You should change the cluster name to something unique to you.
### path.data
By default Elasticsearch stores data in a folder named `data` under the Elasticsearch installation folder. In my case this would be `\Users\jshea\apps\elasticsearch\data`. To enable independence between the application binaries and the data, I have my data in a folder under `\Users\jshea\apps` with the following config entry:
**`path.data: /Users/jshea/apps`**
### http.cors.enabled
>Enable or disable cross-origin resource sharing, i.e. whether a browser on another origin can do requests to Elasticsearch. Defaults to false.
>http://elastic.co/guide/en/elasticsearch/reference/current/modules-http.html

## Running Elasticsearch
The bin folder has programs for Windows and OSX/Linux. Run the program for your operating system (elasticsearch.bat for Windows or elasticsearch for OSX) in a terminal window. Running the application will start an Elasticsearch cluster with one node. To bring up a second node, run a second instance of Elasticsearch in a second terminal window. The two nodes will automatically find each other and coordinate to create a multinode cluster.

Elasticsearch stores data grouped by Index and Type. Rough parallels to a traditional relational database are:

    Relational DB  ⇒ Databases ⇒ Tables ⇒ Rows      ⇒ Columns
    Elasticsearch  ⇒ Indices   ⇒ Types  ⇒ Documents ⇒ Fields

The basic description of these are:

### Index
An index is like a database in a relational database; it’s the place we store and index related data. The name must be lowercase, cannot begin with an underscore, and cannot contain commas.

An index is a logical namespace that points to one or more physical shards. Documents are stored in shards, and shards are allocated to nodes in the cluster. As the cluster grows or shrinks, Elasticsearch will automatically migrate shards between nodes so that the cluster remains balanced.

A shard can be either a primary shard or a replica shard. Each document in the index belongs to a single primary shard, so the number of primary shards determines the maximum amount of data that your index can hold.


### Type
Every type has its own mapping or schema definition, which defines the data structure for documents of that type, much like the columns in a database table. Documents of all types can be stored in the same index, but the mapping for the type tells Elasticsearch how the data in each document should be indexed.

Documents don't have to have the same structure but one shouldn't mix documents of independent structures into the same type because it complicates the mapping that contains all document fields.

A type name can be lowercase or uppercase, but shouldn’t begin with an underscore or contain commas.

In Elasticsearch the Indexes and Types can be pre-initialized, otherwise they will be created as required. By default all document fields are indexed.

For our sample project, the URL to your local cluster and data is `http://localhost:9200/upnreporting/taskorder/`

**Note: We will have to use unique cluster names during our meetings so we can run our clusters independently!**

The default ports start with 9200 for the first node, 9201 for the second...
In this example the index (think database) is `upnreporting` and the type (think table) is `taskorder`.

### Shards
Data is stored in shards which are instances of Apache Lucene. A shard can be a primary or secondary shard. Each document belongs to one primary shard. Secondary shards support data redundancy for query performance and fail over.

The number of primary shards is established when an index is created (default 5) and cannot be changed later. Replica shards can be increased and decreased at any time.

When a document is indexed it's first stored on a primary shard and then copied in parallel to the replica shards.

### Marvel
Marvel is a management and monitoring tool for Elasticsearch, and is free for development use. It can be installed with the plugin program. On my system this is the command:

`\Users\jshea\apps\elasticsearch\bin\plugin install elasticsearch/marvel/latest`

If you're monitoring a remote cluster and don’t want Marvel to monitor your local cluster, you can disable local data collection with this entry in your config file:

`marvel.agent.enabled: false`

### Sense
Marvel comes with an interactive console called Sense, which makes it easy to talk to Elasticsearch directly from your browser. This provides interactive data manipulation along the lines of SQL Plus/SQL Developer.

[http://localhost:9200/_plugin/marvel/sense/](http://localhost:9200/_plugin/marvel/sense/)

### Head
elasticsearch-head is a web front end for browsing and interacting with an Elastic Search cluster.

    \Users\jshea\apps\elasticsearch\bin\plugin install mobz/elasticsearch-head
    open http://localhost:9200/_plugin/head/

## Hosting a website via an Elasticsearch plugin
HTML pages (and Single Page Applications) can be hosted/served from your Elasticsearch server. This is done by installing your web app as an Elasticsearch plugin. Your url will be `http://localhost:9200/_plugin/APPNAME/index.html`

Under your elasticsearch home folder (my folder structure used as an example)

`\jshea\apps\elasticsearch`

Create the following folders

* `plugins` folder in your Elasticsearch folder
* a plugin folder for the website, in this example `myapp`
* a `_site` folder in your website plugin folder

`\jshea\apps\elasticsearch\plugins\myapp\_site`

Copy your web application to the _site folder under your plugin folder.

The URL for your website is `http://localhost:9200/_plugin/myapp`

## Importing data
Elasticsearch has multiple mechanisms for data loading. There is a batch capability that uses JSON formatted input as well as `rivers` and `feeders`.

One river is the JDBC river (https://github.com/jprante/elasticsearch-river-jdbc) which can be used to import data from RDBMS (MySQL, Oracle, SQL Server) to Elasticsearch.

Install with the following command (in your Elasticsearch bin folder)
`plugin --install jdbc --url http://xbib.org/repository/org/xbib/elasticsearch/plugin/elasticsearch-river-jdbc/1.5.0.0/elasticsearch-river-jdbc-1.5.0.0.zip`

The following river can be used to load data from Oracle into Elasticsearch after replacing the uppercase items with your actual values.
```javascript
PUT _river/PICK_A_NAME/_meta
{
   "type" : "jdbc",
   "jdbc" : {
      "driver" :   "oracle.jdbc.OracleDriver",
      "url" :      "jdbc:oracle:thin:@HOST:PORT:SID",
      "user" :     "UID",
      "password" : "PW",
      "sql" :      "select * from TABLE_OR_VIEW",
      "index" :    "INDEX_NAME_TO_INSERT_INTO",
      "type" :     "TYPE_NAME_TO_INSERT_INTO"
   }
}
```

## Exporting/loading data
Multiple tools exist for exporting/importing data into Elasticsearch. One I've used is [elasticdump](https://github.com/taskrabbit/elasticsearch-dump)

Install it with the Node Package Manager (you do have NodeJS installed don't you?).

    npm install elasticdump -g

Export data from Elasticsearch to local files

    elasticdump --input=http://localhost:9200/angularcrud --output=/Users/jshea/angularcrud_mapping.json --type=mapping
    elasticdump --input=http://localhost:9200/angularcrud --output=/Users/jshea/angularcrud_index.json   --type=data

Import data from local files to Elasticsearch

    elasticdump --input=/Users/jshea/angularcrud_mapping.json --output=http://localhost:9200/angularcrud --type=mapping
    elasticdump --input=/Users/jshea/angularcrud_index.json   --output=http://localhost:9200/angularcrud --type=data

## Kibana
