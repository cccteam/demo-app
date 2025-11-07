// package resources provides the resource types for the application
package resources

import (
	"github.com/cccteam/ccc/resource"
)

const pkgName = "github.com/cccteam/demo-app/pkg/resources"

func defaultConfig() resource.Config {
	return resource.Config{
		ChangeTrackingTable: "DataChangeEvents",
		TrackChanges:        true,
	}
}
